import './style.css';
import './tagStyle.css';
import './styleDarkTheme.css';
import './styleLoader.css';
import './spinner.css';
import Experience from './Experience/Experience.js';
import emailjs from '@emailjs/browser';
import emailService from './contactEmail';
const experience = new Experience(document.querySelector(".experience-canvas"));
emailService(emailjs);