import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header';
import '../styles/Home.module.css'
const Home: NextPage = () => {
 
  return (
    <div className={"container"}>
      <Head>
        <title>Meme Coin Launcher</title>
        <meta
          content="Cross Chain Meme Coins"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
        <Header />
        <main className="mt-20 grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24" >
       <div> <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter" >
Work Mate. <br/>Your AI Upwork Job  <br/> Search Assistant
</h1><p className="text-lg mt-4 text-slate-600 max-w-xl" >
an AI-powered agent designed to automate the process of finding freelance jobs on Upwork. It fetches job listings based on your search parameters, filters them using criteria like keywords, budget, and client history, and drafts personalized proposals for you to respond to.</p>
</div><img src="/images/workmate.png" className='h-[400px] rounded-full border-8 border-gray-400'/>
       </main> 
       <Footer />

</div>
      );
};

export default Home;
