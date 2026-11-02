import { withSupabase } from 'npm:@supabase/server@1';
import  {Resend } from 'npm:resend';


type ContactMessageOptions = {
  id: number;
  name: string,
  contact: string;
  message: string
}


type  DatabaseWebhookPayload = {
  type : 'INSERT',
  table: 'contact_messages';
  record: ContactMessageOptions
  old_record: null
}



const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

export default {
  fetch: withSupabase({auth: 'secret'}, async (req) => {

    try {
      const payload:DatabaseWebhookPayload = await   req.json();


      if(payload.type !=='INSERT' || payload.table !=='contact_messages' )return Response.json({error: 'Unsupported webhooks'}, {status: 400})

        const {id, name, message, contact, } = payload.record;

        if(!name || !message || !contact)return Response.json({status: 400}, {error: 'Missing contact message fields'})

          const {data, error} =  await resend.emails.send({from: 'onboarding@resend.dev', to: 'sulleysadick766@gmail.com', subject: `New contact message from ${name}`, text: `
            New contact form  submission
            Name: ${name}
            Contact: ${contact}
            Message: ${message}
            MessageId: ${id}
            `})


            if(error){
              return Response.json({error: error.message ??  'Failed to send email'}, {status: 500})
            }

            return Response.json({success: true,  emailId: data?.id})
      
    } catch (error) {

      return Response.json({error: error.message ?? 'Unable to process contact message'}, {status: 500})
      
    }
}),
   
}
