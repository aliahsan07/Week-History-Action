# This Week in Commits History

This action gathers the commits applied to the repo every week and packages them in an email. 
On every monday, at 7 AM, the cron job runs, leveraging GitHub's API, the commits are gathered that were applied from current date until 7 days from now in history. 

So let's say your repository is 2 years old and today is Monday, 17th Sept 2020. The action will find commits from 17th Sept 2019 to 23rd Sept 2019 and 17th Sept 2018 to 23rd Sept 2018.
All the commits making the cut, will be then sent to the interested users via email. For email, I'm using NodeMailer. 
Currently, the name, email and date of committer is gleaned along with the message. 

This is still work in progress. The inital goal was to complete it by 17th Sept 2020, the deadline of GitHub Actions Hackathon on DEV. 


## Inputs

### `recipients`

## Example usage

uses: actions/Week-History-Action@v1.1
