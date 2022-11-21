const emailTemplate = [
  {
    name: 'Reply application or resume standard template',
    content: `<p>Dear ...,<br><br><br>Hope you are doing well.<br><br>I found your resume in our database and thought you will be a great fit for one of the positions I am working with a client of ours.<br><br>Here is the job details<br><br>Job Title: <span class="vinMarker" style="background-color: yellow">@jobtitle</span><br>Location: <span class="vinMarker" style="background-color: yellow">@jobcity</span>, <span class="vinMarker" style="background-color: yellow">@jobstate</span><br>Description:<br><span class="vinMarker" style="background-color: yellow">@jobdescription</span><br><br>Please let me know if you are interested in this opportunity.<br><br>Thanking you,<br>Your's Sincerely,<br><strong><em><span style="color:#663399;font-size:small;">Nguyen, Tan</span></em></strong><br><span style="color:#663399;font-size:small;"><span class="vinMarker" style="background-color: yellow">@recruiterjobtitle</span></span><br><strong><em><span style="color:#663399;font-size:small;">Can Tho University</span></em></strong><br>thaib1809720@student.ctu.edu.vn<br><span class="vinMarker" style="background-color: yellow">@recruiterprimaryphone</span><br><span class="vinMarker" style="background-color: yellow">@companywebsite</span><br></p>
        `,
  },
  {
    name: 'Invite candidate to join interview standard template',
    content: `<div><div class="adM">
    </div><b><i>Dear Mr. Nguyen Nhi Thai,</i></b><br>
    <br>
    We are delighted to inform you that you have been shortlisted for the position of
    <b>Software Fresher</b> at <b><span class="il">...</span> ....</b>.<br>
    We would like to invite you for the interview scheduled as follows: <br>
    <ul>
    <li>Time: <b>10:00 AM - (GMT+7:00) Ho Chi Minh City</b> </li><li>Date: <b>Monday, March 07, 2022</b> </li>
    </ul>
    Please confirm your attendance by clicking to ... as soon as you can.<br>
    If you have any concern, please do not hesitate to contact us for further information.<br>
    We are looking forward to meeting with you.<br>
    <br>
    Best regards,<br>
    <br>
    <br>
    <b style="font-size:13px">Recruitment team</b>
   `,
  },
  {
    name: 'Result announcement and rejection email template',
    content: `<div class="m_2901081062352392677WordSection1"><div class="adM">
    </div><p class="MsoNormal">Dear Nguyen Nhi Thai,<u></u><u></u></p>
    <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
    <p class="MsoNormal">We would like to thank you so much for your interest in our employment opportunities at <span class="il">.....</span>.....
    <u></u><u></u></p>
    <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
    <p class="MsoNormal">We see that you have solid background knowledge. However, it is regretful that you have not met the requirement of this opening position. Thus, we will keep your CV in on-hold list and contact you later if there is any suitable position
     in the future. <u></u><u></u></p>
    <p class="MsoNormal">Besides, please keep in touch with us via our website: and Fanpage:
    <p class="MsoNormal">Once again, we are really appreciated to your interest and your time for our company’s recruitment.
    <u></u><u></u></p>
    <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
    <p class="MsoNormal">Wish you all the best in your career and your life. <u></u><u></u></p>
    <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
    <p class="MsoNormal">Best Regards,<u></u><u></u></p>
    </div>`,
  },
];

export default emailTemplate;
