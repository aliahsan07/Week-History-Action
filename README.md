# This Week in Commits History

This action gathers the commits applied to the repo every week and packages them in an email. Every Monday, at 7 AM, the cron job runs, leveraging GitHub's API; every commit from the current date until seven days from now in history gets collected.
So let's say your repository is two years old and today is Monday, 17th Sept 2020. The action will find commits from 17th Sept 2019 to 23rd Sept 2019 and 17th Sept 2018 to 23rd Sept 2018. All the commits fitting coming from this timeframe will get sent to the interested users via email. For email, I'm using NodeMailer. Currently, the committer's name, email, and date are gleaned along with the commit message.
This action is still a work in progress. The initial goal was to complete it by 17th Sept 2020, the deadline of the GitHub Actions Hackathon on DEV.


## Inputs

### `recipients`

## Example usage

uses: actions/Week-History-Action@v1.1
