## setup

### Acquiring a Slack Token for Posting Messages

1. **Obtain a Slack Token:**
   - Go to the [Slack API Developer Portal](https://api.slack.com/apps) and select or create your app.
   - Follow the steps in the **Permissions** or **Authentication** section to generate the necessary token for your use case (e.g., user token, bot token).

2. **Set the Token as an Environment Variable:**
   - Export the token as an environment variable by running the following command in your terminal:
     ```bash
     export SLACK_TOKEN=your-slack-token-here
     ```

3. **Using a Bot Token:**
   - If you are using a bot token, ensure that the bot is added to the channel where you intend to post messages. This can be done from the Slack app by inviting the bot to the relevant channel.
