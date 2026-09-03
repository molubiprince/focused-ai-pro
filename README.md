# AI Productivity Hub

Build a modern, responsive web application called “AI Workplace Productivity Assistant” that helps professionals automate daily work tasks using AI. The application should have a clean, professional UI with a dashboard layout, sidebar navigation, and interactive components. Core Features: Smart Email Generator (tone + audience-based) Meeting Notes Summarizer (key points, actions, deadlines) AI Task Planner (prioritization + scheduling) AI Research Assistant (insights + summaries) AI Chatbot Interface Requirements: Use structured prompt engineering for each feature Ensure professional, clear AI outputs Include loading states and responsive design Add disclaimer: “AI-generated content may require human review” Design Style: Modern SaaS UI (clean, minimal, professional) Sidebar navigation + card-based layout Output: A fully functional prototype with interactive UI and AI-powered features. I want to use html, css and javascript for this too. Make blue primary color, include all the tools mentioned, It should be a modern website. Here is the code but it has errors now, i want to fix it. Here is the prompt of what i wanted. Some content overlaps, make the website almost perfect, i want the ai tools to respond including the chatbot and all the tools. When making it bigger screen it overlaps. If it means adding or mixing existing code with another stack or technology is okay.                                                           
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Workplace Productivity Assistant</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --blue-700:#1E3FCC;
    --blue-600:#2F5DFF;
    --blue-500:#5B7FFF;
    --blue-100:#E9EEFF;
    --blue-50:#F4F7FF;
    --navy-900:#0B1220;
    --navy-800:#121A2C;
    --navy-700:#1A2438;
    --ink-900:#151C2C;
    --ink-700:#3A4356;
    --ink-500:#667085;
    --ink-300:#9AA4B2;
    --line:#E4E8F1;
    --surface:#FFFFFF;
    --bg:#F4F6FB;
    --teal:#12B398;
    --amber:#E8A33D;
    --red:#E5484D;
    --radius-lg:16px;
    --radius-md:10px;
    --radius-sm:7px;
    --shadow-1:0 1px 2px rgba(20,25,45,0.05);
    --shadow-2:0 8px 24px -8px rgba(20,25,45,0.14);
    --font-head:'Sora', system-ui, sans-serif;
    --font-body:'Inter', system-ui, sans-serif;
  }

  *{box-sizing:border-box;}
  html,body{height:100%;}
  body{
    margin:0;
    font-family:var(--font-body);
    background:var(--bg);
    color:var(--ink-900);
    -webkit-font-smoothing:antialiased;
  }
  h1,h2,h3,h4{font-family:var(--font-head); margin:0; color:var(--ink-900); font-weight:700;}
  p{margin:0;}
  button{font-family:inherit;}
  ::selection{background:var(--blue-100);}

  a{color:inherit;}

  /* ---------- App shell ---------- */
  .app{
    display:grid;
    grid-template-columns:264px 1fr;
    min-height:100vh;
  }

  /* ---------- Sidebar ---------- */
  .sidebar{
    background:var(--navy-900);
    color:#C7CFE2;
    display:flex;
    flex-direction:column;
    padding:22px 16px;
    position:sticky;
    top:0;
    height:100vh;
  }
  .brand{
    display:flex;
    align-items:center;
    gap:10px;
    padding:6px 8px 22px 8px;
  }
  .brand-mark{
    width:34px;height:34px;border-radius:9px;
    background:linear-gradient(155deg, var(--blue-500), var(--blue-700));
    display:flex;align-items:center;justify-content:center;
    flex:none;
  }
  .brand-mark svg{width:18px;height:18px;}
  .brand-text{display:flex; flex-direction:column; line-height:1.15;}
  .brand-text strong{font-family:var(--font-head); color:#fff; font-size:14.5px; letter-spacing:0.2px;}
  .brand-text span{font-size:11.5px; color:#7C8AAE;}

  .nav{display:flex; flex-direction:column; gap:2px; margin-top:6px;}
  .nav-item{
    display:flex; align-items:center; gap:11px;
    padding:10px 12px;
    border-radius:var(--radius-sm);
    color:#AEB8D1;
    font-size:14px; font-weight:500;
    cursor:pointer;
    border:1px solid transparent;
    background:transparent;
    text-align:left;
    width:100%;
  }
  .nav-item svg{width:17px; height:17px; flex:none; opacity:0.85;}
  .nav-item:hover{ background:rgba(255,255,255,0.05); color:#fff; }
  .nav-item.active{
    background:rgba(47,93,255,0.16);
    color:#fff;
    border-color:rgba(91,127,255,0.3);
  }
  .nav-item.active svg{opacity:1;}

  .nav-section-label{
    font-size:11px; text-transform:none; color:#5C6885;
    margin:18px 4px 6px 4px; font-weight:600;
  }

  .sidebar-footer{
    margin-top:auto;
    padding:14px 12px;
    border-radius:var(--radius-md);
    background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.06);
  }
  .sidebar-footer p{
    font-size:12px; line-height:1.5; color:#8B96B4;
  }
  .sidebar-footer strong{ color:#D7DDEC; }

  .user-chip{
    display:flex; align-items:center; gap:10px;
    margin-top:14px; padding:10px; border-radius:var(--radius-md);
    background:rgba(255,255,255,0.03);
  }
  .avatar{
    width:32px;height:32px;border-radius:50%;
    background:linear-gradient(155deg,#5B7FFF,#12B398);
    display:flex;align-items:center;justify-content:center;
    color:#fff; font-size:12.5px; font-weight:700; flex:none;
  }
  .user-chip .u-name{font-size:13px; color:#E7EAF4; font-weight:600;}
  .user-chip .u-role{font-size:11.5px; color:#7C8AAE;}

  /* ---------- Main ---------- */
  .main{ display:flex; flex-direction:column; min-width:0; }
  .topbar{
    display:flex; align-items:center; justify-content:space-between;
    padding:20px 32px;
    border-bottom:1px solid var(--line);
    background:var(--surface);
    position:sticky; top:0; z-index:5;
  }
  .topbar h1{font-size:19px;}
  .topbar .sub{font-size:13px; color:var(--ink-500); margin-top:3px;}
  .menu-toggle{
    display:none; background:none; border:1px solid var(--line);
    width:36px;height:36px;border-radius:var(--radius-sm); cursor:pointer;
    align-items:center; justify-content:center; margin-right:10px;
  }
  .topbar-left{display:flex; align-items:center;}
  .topbar-right{display:flex; align-items:center; gap:12px;}
  .pill{
    display:flex; align-items:center; gap:6px;
    font-size:12.5px; color:var(--teal); background:#E9FBF6;
    padding:6px 11px; border-radius:99px; font-weight:600;
  }
  .pill span.dot{width:6px;height:6px;border-radius:50%;background:var(--teal); display:inline-block;}

  .view{ display:none; padding:28px 32px 60px 32px; }
  .view.active{ display:block; }

  /* ---------- Dashboard hero ---------- */
  .hero{
    position:relative;
    border-radius:var(--radius-lg);
    padding:34px 30px;
    background:
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 1px) 0 0/16px 16px,
      linear-gradient(120deg, var(--navy-900) 0%, var(--blue-700) 130%);
    color:#fff;
    overflow:hidden;
    opacity:0; transform:translateY(10px);
    animation: rise 0.5s ease forwards;
  }
  .hero h2{ color:#fff; font-size:26px; max-width:520px; line-height:1.3; }
  .hero p{ color:#C6D1F5; margin-top:10px; max-width:480px; font-size:14.5px; line-height:1.55; }
  .hero-stats{ display:flex; gap:28px; margin-top:22px; flex-wrap:wrap; }
  .hero-stat strong{ display:block; font-family:var(--font-head); font-size:22px; color:#fff; }
  .hero-stat span{ font-size:12.5px; color:#AEBCE9; }

  @keyframes rise{ to{ opacity:1; transform:translateY(0);} }

  /* ---------- Cards grid ---------- */
  .section-label{
    font-size:13px; font-weight:600; color:var(--ink-500);
    margin:30px 0 14px 0;
  }
  .grid{
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));
    gap:16px;
  }
  .tool-card{
    background:var(--surface);
    border:1px solid var(--line);
    border-radius:var(--radius-lg);
    padding:20px;
    cursor:pointer;
    display:flex; flex-direction:column; gap:12px;
    transition:border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
    opacity:0; transform:translateY(8px);
    animation: rise 0.45s ease forwards;
  }
  .tool-card:nth-child(1){animation-delay:0.05s;}
  .tool-card:nth-child(2){animation-delay:0.1s;}
  .tool-card:nth-child(3){animation-delay:0.15s;}
  .tool-card:nth-child(4){animation-delay:0.2s;}
  .tool-card:nth-child(5){animation-delay:0.25s;}
  .tool-card:hover{ border-color:var(--blue-500); box-shadow:var(--shadow-2); transform:translateY(-2px); }
  .tool-icon{
    width:38px;height:38px;border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    background:var(--blue-50); color:var(--blue-600);
  }
  .tool-icon svg{width:19px;height:19px;}
  .tool-card h3{font-size:15.5px;}
  .tool-card .desc{font-size:13px; color:var(--ink-500); line-height:1.5;}
  .tool-card .go{
    margin-top:auto; font-size:13px; font-weight:600; color:var(--blue-600);
    display:flex; align-items:center; gap:5px;
  }

  /* ---------- Panels ---------- */
  .panel{
    background:var(--surface);
    border:1px solid var(--line);
    border-radius:var(--radius-lg);
    padding:24px;
  }
  .panel + .panel{ margin-top:18px; }
  .two-col{ display:grid; grid-template-columns:1.1fr 1fr; gap:18px; align-items:start; }

  .field{ margin-bottom:16px; }
  .field label{ display:block; font-size:13px; font-weight:600; color:var(--ink-700); margin-bottom:7px; }
  .field .hint{ font-size:12px; color:var(--ink-300); margin-top:5px; }
  .row-2{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }

  input[type=text], textarea, select{
    width:100%;
    font-family:inherit;
    font-size:14px;
    padding:11px 12px;
    border-radius:var(--radius-sm);
    border:1px solid var(--line);
    background:#FBFCFE;
    color:var(--ink-900);
    outline:none;
    transition:border-color 0.12s ease, box-shadow 0.12s ease;
  }
  textarea{ resize:vertical; min-height:96px; line-height:1.5; }
  input[type=text]:focus, textarea:focus, select:focus{
    border-color:var(--blue-500);
    box-shadow:0 0 0 3px var(--blue-100);
    background:#fff;
  }
  select{ appearance:none; background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path d="M1 1l4 4 4-4" stroke="%23667085" stroke-width="1.5" fill="none" fill-rule="evenodd"/></svg>'); background-repeat:no-repeat; background-position:right 12px center; padding-right:32px; }

  .btn{
    display:inline-flex; align-items:center; justify-content:center; gap:8px;
    padding:11px 18px;
    border-radius:var(--radius-sm);
    border:1px solid transparent;
    font-size:14px; font-weight:600;
    cursor:pointer;
    transition:background 0.12s ease, border-color .12s ease, opacity .12s ease;
  }
  .btn svg{width:15px;height:15px;}
  .btn-primary{ background:var(--blue-600); color:#fff; }
  .btn-primary:hover{ background:var(--blue-700); }
  .btn-primary:disabled{ opacity:0.65; cursor:not-allowed; }
  .btn-ghost{ background:transparent; border-color:var(--line); color:var(--ink-700); }
  .btn-ghost:hover{ border-color:var(--ink-300); }
  .btn-sm{ padding:7px 11px; font-size:12.5px; }

  .error-text{ font-size:12.5px; color:var(--red); margin-top:6px; display:none; }

  /* ---------- Output box ---------- */
  .output-box{
    border:1px dashed var(--line);
    border-radius:var(--radius-md);
    min-height:220px;
    padding:20px;
    background:#FBFCFE;
    position:relative;
  }
  .output-box.has-content{ border-style:solid; background:#fff; }
  .output-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
  .output-head h4{ font-size:13px; color:var(--ink-500); font-weight:600; }
  .output-body{ font-size:14px; line-height:1.65; color:var(--ink-900); }
  .output-body h1,.output-body h2,.output-body h3,.output-body h4{ font-size:14.5px; margin:14px 0 6px 0; font-family:var(--font-body); font-weight:700; }
  .output-body h1:first-child,.output-body h2:first-child,.output-body h3:first-child{margin-top:0;}
  .output-body p{ margin:0 0 10px 0; }
  .output-body ul, .output-body ol{ margin:0 0 12px 0; padding-left:20px; }
  .output-body li{ margin-bottom:5px; }
  .output-body strong{ color:var(--ink-900); }

  .empty-state{
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; gap:8px; padding:34px 10px; color:var(--ink-300);
  }
  .empty-state svg{width:30px;height:30px; opacity:0.55;}
  .empty-state p{font-size:13px; max-width:220px; color:var(--ink-300);}

  .loading-state{ display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:40px 10px; }
  .spinner{
    width:26px;height:26px;border-radius:50%;
    border:3px solid var(--blue-100); border-top-color:var(--blue-600);
    animation:spin 0.8s linear infinite;
  }
  @keyframes spin{ to{ transform:rotate(360deg); } }
  .loading-state span{ font-size:13px; color:var(--ink-500); }

  .disclaimer{
    margin-top:16px;
    display:flex; align-items:flex-start; gap:8px;
    font-size:12px; color:var(--ink-300);
    padding-top:14px; border-top:1px solid var(--line);
  }
  .disclaimer svg{ width:14px; height:14px; flex:none; margin-top:1px; opacity:0.7; }

  /* ---------- Chat ---------- */
  .chat-panel{ display:flex; flex-direction:column; height:calc(100vh - 210px); min-height:420px; }
  .chat-log{ flex:1; overflow-y:auto; padding:6px 4px 10px 4px; display:flex; flex-direction:column; gap:14px; }
  .msg{ display:flex; gap:10px; max-width:78%; }
  .msg.user{ align-self:flex-end; flex-direction:row-reverse; }
  .msg .bubble{
    padding:11px 14px; border-radius:var(--radius-md); font-size:14px; line-height:1.55;
  }
  .msg.assistant .bubble{ background:#F1F4FA; color:var(--ink-900); border-top-left-radius:4px; }
  .msg.user .bubble{ background:var(--blue-600); color:#fff; border-top-right-radius:4px; }
  .msg .bubble p{ margin:0 0 8px 0; }
  .msg .bubble p:last-child{ margin-bottom:0; }
  .msg .bubble ul,.msg .bubble ol{ margin:0 0 8px 18px; padding:0; }
  .msg-avatar{
    width:28px;height:28px;border-radius:50%; flex:none;
    display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff;
  }
  .msg.assistant .msg-avatar{ background:linear-gradient(155deg, var(--blue-500), var(--blue-700)); }
  .msg.user .msg-avatar{ background:#333B4F; }

  .chat-input-row{
    display:flex; align-items:flex-end; gap:10px;
    border-top:1px solid var(--line); padding-top:14px; margin-top:12px;
  }
  .chat-input-row textarea{ min-height:44px; max-height:140px; }
  .chat-input-row .btn{ height:44px; width:44px; padding:0; flex:none; border-radius:var(--radius-sm); }

  /* ---------- Misc ---------- */
  .kicker{ font-size:13px; color:var(--blue-600); font-weight:600; margin-bottom:8px; }
  .helper-panel h4{ font-size:14px; margin-bottom:10px; }
  .helper-panel ol{ padding-left:18px; margin:0; font-size:13px; color:var(--ink-500); line-height:1.8; }
  .helper-panel{ background:var(--blue-50); border:1px solid var(--blue-100); }

  @media (max-width: 980px){
    .two-col{ grid-template-columns:1fr; }
  }

  @media (max-width: 820px){
    .app{ grid-template-columns:1fr; }
    .sidebar{
      position:fixed; left:0; top:0; height:100vh; width:250px; z-index:50;
      transform:translateX(-100%);
      transition:transform 0.2s ease;
      box-shadow:12px 0 40px rgba(0,0,0,0.25);
    }
    .sidebar.open{ transform:translateX(0); }
    .menu-toggle{ display:flex; }
    .topbar{ padding:16px 18px; }
    .view{ padding:18px; }
    .row-2{ grid-template-columns:1fr; }
    .hero-stats{ gap:18px; }
    .scrim{ display:none; position:fixed; inset:0; background:rgba(10,14,24,0.45); z-index:40; }
    .scrim.show{ display:block; }
  }

  @media (prefers-reduced-motion: reduce){
    .hero, .tool-card{ animation:none; opacity:1; transform:none; }
    .spinner{ animation-duration:1.4s; }
  }








  



  


    


      


        
      


      


        Workplace AI
        Productivity Assistant
      


    



    
      
        
        Dashboard
      

      

Tools



      
        
        Email Generator
      
      
        
        Meeting Notes
      
      
        
        Task Planner
      
      
        
        Research Assistant
      
      
        
        AI Chatbot
      
    

    


      

JL


      


        

Jordan Lee


        

Product Manager


      


    



    


      

Note: AI-generated content may require human review before use.


    



  


    


      


        
          
        
        


          

Dashboard


          

A quick look at what you can automate today


        


      


      


        

Connected to Claude


      


    



    
    


      


        

Less admin. More of the work that actually matters.


        

Draft emails, summarize meetings, plan your day, and research topics in seconds — all in one workspace built around Claude.


        


          

5AI tools included


          

<30saverage output time


          

1place for daily tasks


        


      



      

Your tools


      


        


          


          

Smart Email Generator


          

Turn a few notes into a polished email, matched to tone and audience.


          

Open tool


        


        


          


          

Meeting Notes Summarizer


          

Paste raw notes or a transcript and get key points, decisions and deadlines.


          

Open tool


        


        


          


          

AI Task Planner


          

List what's on your plate and get it prioritized and scheduled.


          

Open tool


        


        


          


          

AI Research Assistant


          

Ask a question and get a structured brief with key insights and sources.


          

Open tool


        


        


          


          

AI Chatbot


          

A general assistant on hand for quick questions and drafting help.


          

Open tool


        


      


    



    
    


      


        


          

Smart Email Generator


          


            What's the email about?
            
            

Add a short description so Claude knows what to write about.


          


          


            


              Audience
              
                Client
                Manager
                Colleague
                Executive / leadership
                Team (group)
                Vendor / partner
              
            


            


              Tone
              
                Professional and warm
                Formal
                Friendly and casual
                Direct and concise
                Persuasive
                Apologetic
              
            


          


          


            Key points to include (optional)
            
          


          
            
            Generate email
          
        



        


          

Generated email


            Copy
          


          


            


              
              

Fill in the brief and your drafted email will appear here.


            


          


          


            
            AI-generated content may require human review.
          


        


      


    



    
    


      


        


          

Meeting Notes Summarizer


          


            Paste your raw notes or transcript
            
            

Paste in some notes first so there's something to summarize.


          


          
            
            Summarize notes
          
        



        


          

Summary


            Copy
          


          


            


              
              

Key points, decisions, action items and deadlines will show up here.


            


          


          


            
            AI-generated content may require human review.
          


        


      


    



    
    


      


        


          

AI Task Planner


          


            What's on your list?
            
            

List at least one task so Claude has something to plan.


          


          


            


              Plan for
              
                Today
                This week
              
            


            


              Available hours
              
                2 hours
                4 hours
                6 hours
                8 hours
              
            


          


          
            
            Plan my tasks
          
        



        


          

Prioritized plan


            Copy
          


          


            


              
              

Your prioritized, scheduled task list will show up here.


            


          


          


            
            AI-generated content may require human review.
          


        


      


    



    
    


      


        


          

AI Research Assistant


          


            What do you want to research?
            
            

Add a question or topic to research.


          


          


            Depth
            
              Quick overview
              Detailed brief
            
          


          
            
            Research this
          
        



        


          

Research brief


            Copy
          


          


            


              
              

An overview, key insights and sources will appear here.


            


          


          


            
            AI-generated content may require human review.
          


        


      


    



    
    


      


        


          


            

AI


            

Hi Jordan, I'm your workplace assistant. Ask me anything — draft help, quick questions, or a second opinion on something you're working on.


          


        


        


          
          
            
          
        


      


      


        
        AI-generated content may require human review.
      


    



  





                                                                  Here is the existing code, continue from here on.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://focused-ai-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8ef7a9b6-6900-454f-9598-95c25ef60052).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
