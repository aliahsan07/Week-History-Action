const core = require("@actions/core");
const { Octokit } = require("@octokit/core");
const mailer = require("nodemailer")
const octokit = new Octokit({ auth: `6a88daf75e0fd27b5caee3762b286f641c91e01a` });
require('dotenv').config();


const repo = core.getInput('repo');

const transporter = mailer.createTransport({
	service: 'gmail',
	auth:{
		user: process.env.EMAIL_USER,
		pass : process.env.EMAIL_PASS
	}
})


transporter.verify(function(error, success) {
  if (error) {
	console.log(error);
  } else {
	console.log("Server is ready to take our messages");
  }
});


var repoName;

let body ={
	from: 'ali.khilji94@gmail.com',
	to: 'aliahsan07@outlook.com',
	subject: 'CommitHistory - This week in history',
	html: '<h2>Hey you! Its time for a recap of your commits in the repo </h2><br>',
}


async function fetchCommits(fromDate, selectedCommits){
	
	const toDate = new Date(fromDate);
	toDate.setDate(toDate.getDate() + 44);
	const response = await octokit.request('GET /repos/{owner}/{repo}/commits?since={fromDate}&until={toDate}', {
	  owner: 'aliahsan07',
	  repo: 'githubAPIData',
	  since: fromDate,
	  until: toDate,
	})
	if (response.data && response.data.length > 0){
		commits = response.data;
		for (i=0; i < commits.length; i++){
			const {commit} = commits[i];
			const {name, email, date} = commit.committer;
			selectedCommits.push({
				committer: name || "",
				email: email || "",
				date: new Date(date).toDateString() || "",
				message: commit.message
			})
		}
	}
	
}


function getPreviousYearDates(date){
	const currentDate = new Date();
	const startDate = new Date(date);
	
	const dates = [];
	while(currentDate > startDate){
		currentDate.setFullYear(currentDate.getFullYear() - 1)
		tempDate = new Date(currentDate);
		dates.push(tempDate);
	}
	
	dates.reverse();
	return dates;
	
}


function constructMessage(commits){
	var content = '<table style="border-collapse:collapse>' +
	  '<thead style="background-color: #f2f2f2;">' +
	  '<th> Committer </th>' +
	  '<th> Email </th>'  +
	  '<th> Date </th>'  +
	  '<th> Message </th>'  +
	  /*...*/
	  '</thead>' 
	
	
	for (let i = 0; i < commits.length; i++){
		const { committer, email, date, message } = commits[i]
		content +=
		`<tr> 
		  <td>  ${committer} </td> +
		  <td>  ${email} </td> +
		  <td>  ${date} </td> +
		  <td>  ${message} </td> +
		</tr>`
	}
	
	content +=  '</table>';
	
	
	return content;
}


async function run(){
	
	const repositoryDetails = await octokit.request('GET /repos/{owner}/{repo}', {
	  owner: 'aliahsan07',
	  repo: 'githubAPIData'
	})
	
	const repoCreatedAt = repositoryDetails.data['created_at'];
	const dates = getPreviousYearDates(repoCreatedAt); 
	
	const selectedCommits = [];
	
	for (i = 0; i<dates.length; i++){
		await fetchCommits(dates[i], selectedCommits);
	}
	body.html = JSON.stringify(constructMessage(selectedCommits));
	
	
	console.log(body.html)
	
	
	transporter.sendMail(body,(err, result) =>{
		if (err) {
			console.log(err);
			return false
		}
		console.log(result);
		console.log("email sent");
	})
}


run()




