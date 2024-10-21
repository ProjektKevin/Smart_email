import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build  # Import the build function
import base64
import email

# Define the Gmail API scopes
SCOPES = [
    'https://www.googleapis.com/auth/gmail.send', 
    'https://www.googleapis.com/auth/gmail.readonly', 
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.modify'
]

# Lists to store email details
subjects = []
senders = []
bodies = []

def myEmails():
    creds = None
    # Check if token.json exists to load existing credentials
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    # If there are no valid credentials, initiate login flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for future use
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    # Build the Gmail service
    service = build('gmail', 'v1', credentials=creds) 
    
    # Fetch the list of messages
    result = service.users().messages().list(userId='me').execute()
    messages = result.get('messages', [])
    
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        
        # Extract payload
        payload = msg['payload']
        headers = payload['headers']
        
        # Initialize variables for subject, sender, and body
        subject = None
        sender = None
        body = ""
        
        # Extract subject and sender
        for header in headers:
            if header['name'] == 'Subject':
                subject = header['value']
            elif header['name'] == 'From':
                sender = header['value']
        
        # Decode the email body if present
        if 'parts' in payload:
            for part in payload['parts']:
                if part['mimeType'] == 'text/plain':
                    body = base64.urlsafe_b64decode(part['body']['data']).decode('utf-8')
        else:
            body = base64.urlsafe_b64decode(payload['body']['data']).decode('utf-8')

        # Append extracted information to lists
        if subject:
            subjects.append(subject)
        if sender:
            senders.append(sender)
        if body:
            bodies.append(body)

# Call the function to authenticate and get Gmail API credentials
myEmails()

# Print the extracted email information
for i in range(len(subjects)):
    print(f"Subject: {subjects[i]}")
    print(f"Sender: {senders[i]}")
    print(f"Body: {bodies[i][:100]}...")  # Print the first 100 characters of the body