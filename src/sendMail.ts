export const sendMailFun = async (request:any) => {
    try { 
        const apiKey = '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';
        const apiUrl = 'https://api.brevo.com/v3/smtp/email';
        const requestBody = await request.json();
        const recipients = Array.isArray(requestBody.to) ? requestBody.to : [];

        const requestData = {
 
          sender : {"name":"wael","email":"waeltn7@gmail.com"},
          to: recipients.map((recipient: { email: any; name: any; }) => ({
            "email": recipient.email || "",
            "name": recipient.name || ""
          })),
          subject: 'Feedback assignment',
          htmlContent :"<html><body><h1>You have a feedback assigned to you to fill !</h1></body></html>"
        };
      
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'api-key': apiKey,
              'content-type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log('Email sent successfully:', responseData);
          } else {
            const errorData = await response.json();
            console.error('Error sending email:', errorData);
          }
        } catch (error) {
          console.error('Error sending email:', error);
        }
      
    return new Response(JSON.stringify({ surveys: requestData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
  });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
  };
  
   