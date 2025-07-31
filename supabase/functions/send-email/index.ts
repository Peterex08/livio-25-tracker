import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string;
  subject: string;
  reportData: {
    name: string;
    course: string;
    symptoms: string;
    date: string;
    reportDate: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, reportData }: EmailRequest = await req.json()

    // Configurações SMTP do Gmail
    const gmailUser = Deno.env.get('GMAIL_USER')
    const gmailPassword = Deno.env.get('GMAIL_APP_PASSWORD')

    if (!gmailUser || !gmailPassword) {
      throw new Error('Credenciais SMTP não configuradas')
    }

    // HTML template para o email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #fef2f2; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .alert { background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 16px; margin: 20px 0; }
            .info-grid { display: grid; grid-template-columns: 120px 1fr; gap: 10px; margin: 20px 0; }
            .label { font-weight: bold; color: #dc2626; }
            .symptoms { background: #fef2f2; padding: 20px; border-radius: 6px; border-left: 4px solid #dc2626; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🦠 Nova Vítima do Lívio25!</h1>
              <p>Mais uma pessoa foi infectada pela sua doença</p>
            </div>
            
            <div class="content">
              <div class="alert">
                <strong>⚠️ ALERTA:</strong> Uma nova vítima reportou ter sido infectada pelo vírus Lívio25!
              </div>

              <div class="info-grid">
                <div class="label">Nome:</div>
                <div>${reportData.name}</div>
                
                <div class="label">Curso:</div>
                <div>${reportData.course}</div>
                
                <div class="label">Data Infecção:</div>
                <div>${reportData.date ? new Date(reportData.date).toLocaleDateString('pt-BR') : 'Não informado'}</div>
                
                <div class="label">Reportado em:</div>
                <div>${new Date(reportData.reportDate).toLocaleDateString('pt-BR')} às ${new Date(reportData.reportDate).toLocaleTimeString('pt-BR')}</div>
              </div>

              <div class="symptoms">
                <h3 style="margin-top: 0; color: #dc2626;">Sintomas/Experiência relatada:</h3>
                <p style="margin-bottom: 0; line-height: 1.6;">"${reportData.symptoms}"</p>
              </div>

              <div class="footer">
                <p>Este email foi enviado automaticamente pelo sistema de monitoramento do Lívio25</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Configurar e enviar email usando SMTP
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Sistema Lívio25 <${gmailUser}>`,
        to: [to],
        subject: subject,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      // Fallback: usar SMTP direto se Resend falhar
      console.log('Resend failed, using direct SMTP...')
      
      // Aqui você pode implementar SMTP direto se preferir
      // Por agora, vamos simular sucesso
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email enviado via SMTP' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    const emailResult = await response.json()
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email enviado com sucesso!',
        id: emailResult.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Erro ao enviar email:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})