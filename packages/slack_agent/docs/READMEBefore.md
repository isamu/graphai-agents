## setup

### Acquiring a Slack Token for Posting Messages

1. **Obtain a Slack Token:**
   - Navigate to the [Slack API Developer Portal](https://api.slack.com/apps) and select your app.
   - Go to the **OAuth & Permissions** section.
   - Under the **OAuth Tokens for Your Workspace** section, you will find the token. This token is necessary to post messages.

2. **Set the Token as an Environment Variable:**
   - Export the token as an environment variable by running the following command in your terminal:
     ```bash
     export SLACK_TOKEN=your-slack-token-here
     ```

3. **Using a Bot Token:**
   - If you are using a bot token, ensure that the bot is added to the channel where you intend to post messages. This can be done from the Slack app by inviting the bot to the relevant channel.
