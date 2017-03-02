// A Google App Script to send all the placement related mails to your primary email address.
// It sends only those mails that VIT Placements sent today (Not 24 hours convention).

// Run this script with your VIT email ID as the active session.

function searchMails() {
  var primaryEmail = "emailId@domain.com"; // Change this to your primary email ID
  var emails = GmailApp.search('from:VITIANS18-noreply@yahoogroups.com');
  var DateDiff = {    
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    }
  }
  
  var todaysDate = new Date();
  for(var i=0;i<emails.length;i++){
    var messages = emails[i].getMessages();
    for(var j=0;j<messages.length;j++){
      var messageDate = messages[j].getDate()
      if(DateDiff.inDays(messageDate,todaysDate) == 0){
        messages[j].markRead();
        messages[j].forward(primaryEmail);
      }
    }
  }
}
