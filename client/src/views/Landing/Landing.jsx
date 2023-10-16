import React from 'react';
import LandingPage from '../../components/LandingPage/LandingPage.jsx';
import style from './Landing.module.css';



const Landing = () => {
  return (
    <div className={style.landingContainer}>  
      <LandingPage />
       
     <div className={style.socialDiv}>
     
                    <a className={style.githubButton} target="_blank" rel="noreferrer" href="https://github.com/ferreiroariel1" ><img className={style.redesimg} src="https://i.postimg.cc/kVrbZ0dt/githublogo.png" alt="github" /></a>
                    <a className={style.instagramButton} target="_blank" rel="noreferrer" href="https://www.instagram.com/ariel_ferreiro1/" ><img className={style.redesimg} src="https://i.postimg.cc/rdSrLf8Z/instalogo.png" alt="instagram" /></a>
                    <a className={style.linkedinButton} target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/ariel-ferreiro-30b153237/" ><img className={style.redesimg} src="https://w7.pngwing.com/pngs/524/809/png-transparent-computer-icons-resume-linkedin-logo-job-hunting-others-blue-angle-text-thumbnail.png" alt="github" /></a>
     </div>
    </div>
  );
};

export default Landing;

