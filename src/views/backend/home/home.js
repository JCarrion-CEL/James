import React,{ useState} from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { Container,Col,Row } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';
// import Select from 'react-select'
// img
import logo from '../../../assets/images/logo.png'
import icon from '../../../assets/video/trailer.mp4'
import ReactPlayer from 'react-player'

// favorite img
// import fav1 from '../../../assets/images/favorite/01.jpg'
// import fav2 from '../../../assets/images/favorite/02.jpg'
// import fav3 from '../../../assets/images/favorite/03.jpg'
// import fav4 from '../../../assets/images/favorite/04.png'
// import fav5 from '../../../assets/images/favorite/05.jpg'

// upcoming img
// import upcoming1 from '../../../assets/images/upcoming/01.jpg'
// import upcoming2 from '../../../assets/images/upcoming/02.jpg'
// import upcoming3 from '../../../assets/images/upcoming/03.jpg'
// import upcoming4 from '../../../assets/images/upcoming/04.jpg'
// import upcoming5 from '../../../assets/images/upcoming/05.jpg'


// suggested
import suggested1 from '../../../assets/images/suggested/bio1.jpeg'
import suggested2 from '../../../assets/images/suggested/biopro2.jpeg'
// import suggested3 from '../../../assets/images/suggested/03.jpg'
// import suggested4 from '../../../assets/images/suggested/04.jpg'
// import suggested5 from '../../../assets/images/suggested/05.jpg'

// parallax
// import parallax3 from '../../../assets/images/parallax/p1.jpg'
// import parallax4 from '../../../assets/images/parallax/parallax-logo.png'

// trending
// import trending1 from '../../../assets/images/trending/01.jpg'
// import trending2 from '../../../assets/images/trending/02.jpg'
// import trending3 from '../../../assets/images/trending/03.jpg'
// import trending4 from '../../../assets/images/trending/04.jpg'
// import trending5 from '../../../assets/images/trending/05.jpg'
// import trending6 from '../../../assets/images/trending/06.jpg'
// import trendinglabel from '../../../assets/images/trending/trending-label.png'

// episodes
// import episodes1 from '../../../assets/images/episodes/01.jpg'
// import episodes2 from '../../../assets/images/episodes/02.jpg'
// import episodes3 from '../../../assets/images/episodes/03.jpg'
// import episodes4 from '../../../assets/images/episodes/04.jpg'
// import episodes5 from '../../../assets/images/episodes/05.jpg'

// // tvthrillers
// import tvthrillers1 from '../../../assets/images/tvthrillers/01.jpg'
// import tvthrillers2 from '../../../assets/images/tvthrillers/02.jpg'
// import tvthrillers3 from '../../../assets/images/tvthrillers/03.jpg'
// import tvthrillers4 from '../../../assets/images/tvthrillers/04.jpg'
// import tvthrillers5 from '../../../assets/images/tvthrillers/05.jpg'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade,Navigation,Thumbs,Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([EffectFade,Navigation,Thumbs,Pagination]);

const gsapAnimate = {
   getData: (elem) => {
      const option = {
         opacity: 0,
         scale: 1,
         position: {
               x: 0,
               y:0,
         },
         ease: "",
         duration: 1,
         delay: .4,
         rotate: 0
      }
      if(elem !== undefined) {
         option.position.x = gsapAnimate.validValue(elem.dataset.iqPositionX, 0)

         option.position.y = gsapAnimate.validValue(elem.dataset.iqPositionY, 0)

         option.rotate = gsapAnimate.validValue(elem.dataset.iqRotate, 0)

         option.scale = gsapAnimate.validValue(elem.dataset.iqScale, 1)

         option.opacity = gsapAnimate.validValue(elem.dataset.iqOpacity, 0)

         option.delay = gsapAnimate.validValue(elem.dataset.iqDelay, .4)

         option.duration = gsapAnimate.validValue(elem.dataset.iqDuration, 1.5)

         option.ease = gsapAnimate.validValue(elem.dataset.iqEase, '')

         const setOption = {opacity: option.opacity, scale: option.scale, x: option.position.x, y: option.position.y, ease: option.ease, rotate: option.rotate, duration: option.duration, delay: option.delay}

         return setOption
      } else {
         return {opacity: 0}
      }
   },
   onStart : (elem) => {
      
      const setOption = gsapAnimate.getData(elem)

      gsap.from(elem, setOption)

   },

   onEnd : (elem) => {
      
      const setOption = gsapAnimate.getData(elem)
      
      gsap.to(elem, setOption)

   },

   onStartEnd : (elem) => {

      const setOption = gsapAnimate.getData(elem)

      const setEndOption = gsapAnimate.getData(elem)

      setEndOption.opacity = 1

      setEndOption.x = 0

      setEndOption.y = 0

      setEndOption.rotate = 0

      setEndOption.scale = 1

      gsap.fromTo(elem, setOption, setEndOption)
   },
   validValue: (attr, defaultVal) => {
      if (attr !== undefined && attr !== null) {
         return Number(attr)
      }
      return Number(defaultVal)
   }
}

// const s3HTML = `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width">
//   <title>S3Bubble Demo</title>
//   <link rel="stylesheet" href="https://unpkg.com/s3bubble-javascript/s3bubble.min.css" />
// </head>
// <body>
//   <div class="s3bubble" data-code="r6yufr"></div>
//   <script src="https://unpkg.com/s3bubble-javascript/s3bubble.min.js"></script>
// </body>
// </html>`


const Homepage =()=>{
   // const [thumbsSwiper, setThumbsSwiper] = useState(null);
   const [toggler1] = useState(false);
   const [toggler2] = useState(false);
   const [toggler3] = useState(false);

   // Automate: 
   const [subscribedUser] = useState(false)

   // useEffect(() => {
   //    window.s3bubble('vod-player').video({
   //       code: 'r6yufr'
   //   }, function(player) {
   //      console.log('palyer:: ', player)
   //       // You can listen to any video events here
   //       player.on('timeupdate', function(event) {
   //           console.log('event', player.currentTime());
   //       });
   //   });
   // }, [])

   const animationInit = () => {
      if(document.querySelector('.swiper-container .swiper-slide-active') !== null) {

         const gsapElem = document.querySelector('.swiper-container .swiper-slide-active').querySelectorAll('[data-iq-gsap="onStart"]')

         Array.from(gsapElem, (elem) => {
            return gsapAnimate.onStartEnd(elem)
         })
      }
   }
   
  
   // const options1 = [
   //    { value: 'season 1', label: 'Season 1' },
   //    { value: 'season 2', label: 'Season 2' },
   //    { value: 'season 3', label: 'Season 3' }
   // ]

   // const options2 = [
   //    { value: 'season 1', label: 'Season 1' },
   //    { value: 'season 2', label: 'Season 2' }
   // ]

   return(
      <>
         <FsLightbox
               toggler={toggler1}
               sources={[
                  <iframe src={icon} title=" " width="500px" height="200px"
                     frameBorder="0" allow="autoplay; fullscreen" />
               ]}
         />  
         <FsLightbox
            toggler={toggler2}
            sources={[
               <iframe src={icon} title=" " width="500px" height="200px"
                  frameBorder="0" allow="autoplay; fullscreen" />
            ]}
         />
         <FsLightbox
            toggler={toggler3}
            sources={[
               <iframe src={icon} title=" " width="500px" height="200px"
                  frameBorder="0" allow="autoplay; fullscreen" />
            ]}
         />
         <section id="home" className="iq-main-slider p-0 iq-rtl-direction">
            <div id="prev5" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
            <div id="next5" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>        
            <Swiper  
               navigation={{
                  prevEl: '#prev5',
                  nextEl: '#next5'
               }}
               pagination={{
                  "clickable":true
               }}

               onInit={() => {animationInit()}} 
               onSlideChangeTransitionStart={() => animationInit()}
               loop={true} 
               id="home-slider" 
               className="slider m-0 p-0">
               <SwiperSlide className="slide slick-bg s-bg-1">
                  <Container fluid className="position-relative h-100">
                     <div className="slider-inner h-100">
                        <Row className="align-items-center  iq-ltr-direction h-100 ">
                           <Col xl="6" lg="12" md="12">
                              <Link to="#">
                                 <div className="channel-logo" data-iq-delay="0.5">
                                    <img src={logo} className="c-logo" alt="streamit"/>
                                 </div>
                              </Link>
                              <h3 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">Biosolids Pro 180 Part 1</h3>
                              <div className="d-flex flex-wrap align-items-center">
                                 <div className="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                    <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star-half" aria-hidden="true"></i>
                                       </li>
                                    </ul>
                                    <span className="text-white ml-2">4.7</span>
                                 </div>
                                 <div className="d-flex align-items-center mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                    <span className="badge badge-secondary p-2">VOD2+</span>
                                 </div>
                                 <p data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">Learn the latest and greatest topics in biosolids covering but not limited to historical overview of biosolids, biosolids management practices, exceptional quality (EQ) biosolids, and more
                                 </p>
                              </div>
                              <div className="trending-list" data-wp_object-in="fadeInUp" data-delay-in="1.2">
                                 <div className="text-primary title starring">
                                 Special Guest: <span className="text-body">Dr Mike McFarland</span>
                                 </div>
                                 <div className="text-primary title genres">
                                 Produced By: <span className="text-body">CEL, PC</span>
                                 </div>
                              </div>
                              <div className="d-flex align-items-center r-mb-23" data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                                 {!subscribedUser && <Link to="/pricing-plan" className="btn btn-hover iq-button">
                                    <i className="fa fa-rocket mr-2" aria-hidden="true"></i>Subscribe Now
                                 </Link>}
                              </div>
                           </Col>
                           <Col xl="5" lg="12" md="12" className="trailor-video text-center">
                           {/* <div id="vod-player" data-code="r6yufr"></div> */}
                           {/* <iframe className="iframe-video" title="Biosolids Pro 180 Trailer" srcdoc={s3HTML}/> */}
                           {/* <video className="video d-block" controls loop>
                              <source src="http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8" type="application/x-mpegURL"/>
                           </video> */}
                           <ReactPlayer 
                              controls
                              muted
                              loop
                              playing
                              className="video d-block" 
                              width="100%"
                              url="https://vimeo.com/695874025" />
                              {/* <Link onClick={() => setToggler1(!toggler1)}  to="/" className="video-open playbtn">
                                 <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7"
                                    enableBackground="new 0 0 213.7 213.7" xmlSpace="preserve">
                                    <polygon className='triangle' fill="none" strokeWidth="7" strokeLinecap="round"
                                       strokeLinejoin="round" strokeMiterlimit="10"
                                       points="73.5,62.5 148.5,105.8 73.5,149.1 " />
                                    <circle className='circle' fill="none" strokeWidth="7" strokeLinecap="round"
                                       strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                                 </svg>
                                 <span className="w-trailor">Watch Trailer</span>
                              </Link> */}
                           </Col>
                        </Row>
                     </div>
                  </Container>
               </SwiperSlide>
               <SwiperSlide className="slide slick-bg s-bg-2">
                  <Container fluid className="position-relative h-100">
                     <div className="slider-inner h-100">
                        <Row className="align-items-center  iq-ltr-direction h-100 ">
                           <Col xl="6" lg="12" md="12">
                              <Link to="#">
                                 <div className="channel-logo" data-iq-delay="0.5">
                                    <img src={logo} className="c-logo" alt="streamit"/>
                                 </div>
                              </Link>
                              <h3 className="slider-text big-title title text-uppercase" data-iq-gsap="onStart" data-iq-position-x="-200">Biosolids Pro 180 Part 2</h3>
                              <div className="d-flex flex-wrap align-items-center">
                                 <div className="slider-ratting d-flex align-items-center mr-4 mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                    <ul className="ratting-start p-0 m-0 list-inline text-primary d-flex align-items-center justify-content-left">
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star" aria-hidden="true"></i>
                                       </li>
                                       <li>
                                          <i className="fa fa-star-half" aria-hidden="true"></i>
                                       </li>
                                    </ul>
                                    <span className="text-white ml-2">4.7</span>
                                 </div>
                                 <div className="d-flex align-items-center mt-2 mt-md-3" data-iq-gsap="onStart" data-iq-position-x="-200" data-iq-delay="-0.5">
                                    <span className="badge badge-secondary p-2">VOD2+</span>
                                 </div>
                                 <p data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">Solidify and advance your biosolids knowledge and expertise with the our Biosolids Land Applier Training Part II</p>
                              </div>
                              <div className="trending-list" data-wp_object-in="fadeInUp" data-delay-in="1.2">
                                 <div className="text-primary title starring">
                                 Special Guest: <span className="text-body">Dr Mike McFarland</span>
                                 </div>
                                 <div className="text-primary title genres">
                                 Produced By: <span className="text-body">CEL, PC</span>
                                 </div>
                              </div>
                              <div className="d-flex align-items-center r-mb-23" data-iq-gsap="onStart" data-iq-position-y="80" data-iq-delay="0.8">
                                 {!subscribedUser && <Link to="/pricing-plan" className="btn btn-hover iq-button">
                                    <i className="fa fa-rocket mr-2" aria-hidden="true"></i>Subscribe Now
                                 </Link>}
                              </div>
                           </Col>
                           <Col xl="5" lg="12" md="12" className="trailor-video text-center">
                               {/* <div id="vod-player" data-code="r6yufr"></div> */}
                               {/* <video className="video d-block" controls loop>
                                 <source src="http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8" type="application/x-mpegURL"/>
                              </video> */}
                              <ReactPlayer 
                                 controls
                                 muted
                                 loop
                                 playing
                                 className="video d-block" 
                                 width="100%"
                                 url="https://vimeo.com/695874025" />
                              {/* <Link onClick={() => setToggler1(!toggler1)}  to="/" className="video-open playbtn">
                                 <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px" y="0px" width="80px" height="80px" viewBox="0 0 213.7 213.7"
                                    enableBackground="new 0 0 213.7 213.7" xmlSpace="preserve">
                                    <polygon className='triangle' fill="none" strokeWidth="7" strokeLinecap="round"
                                       strokeLinejoin="round" strokeMiterlimit="10"
                                       points="73.5,62.5 148.5,105.8 73.5,149.1 " />
                                    <circle className='circle' fill="none" strokeWidth="7" strokeLinecap="round"
                                       strokeLinejoin="round" strokeMiterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                                 </svg>
                                 <span className="w-trailor">Watch Trailer</span>
                              </Link> */}
                           </Col>
                        </Row>
                     </div>
                  </Container>
               </SwiperSlide>
            </Swiper>
         </section>
         <div className="main-content">
            <section id="iq-suggestede" className="s-margin">
               <Container fluid>
                  <Row>
                     <Col sm="12" className="overflow-hidden">
                        <div className="d-flex align-items-center justify-content-between">                       
                           <h4 className="main-title">Suggested For You</h4>
                           {/* <Link className="iq-view-all" to="/categories">View All</Link>                      */}
                        </div>
                        <div id="suggestede-contens">
                           <div id="prev2" className="swiper-button swiper-button-prev"><i className= "fa fa-chevron-left"></i></div>
                           <div id="prev2" className="swiper-button swiper-button-next"><i className= "fa fa-chevron-right"></i></div>
                           <Swiper 
                              slidesPerView={2} 
                              spaceBetween={20} 
                              navigation={{
                                 prevEl: '#prev2',
                                 nextEl: '#next2'
                              }} 
                              breakpoints={{
                                 320: { slidesPerView: 1 },
                                 550: { slidesPerView: 2 },
                                 // 991: { slidesPerView: 3 },
                                 // 1400: { slidesPerView: 4 },
                              }}
                              loop={true} 
                              as="ul"  
                              className="list-inline favorites-slider row p-0 m-0 iq-rtl-direction">
                              <SwiperSlide as="li">    
                                 <div className=" block-images position-relative">
                                    <div className="img-box">
                                       <img src={suggested1} className="img-fluid" alt=""/>
                                    </div>
                                    <div className="block-description">
                                       <h6 className="iq-title"><Link to="/pricing-plan">Biosolids Pro 180 Part 1</Link></h6>
                                       <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                          <span className="text-white">4h 30m</span>
                                       </div>
                                       <div className="hover-buttons">
                                          <Link to="/pricing-plan" role="button" className="btn btn-hover iq-button">
                                             <i className="fa fa-rocket mr-2" aria-hidden="true"></i>Subscribe Now
                                          </Link>
                                       </div>
                                    </div>
                                    <div className="block-social-info">
                                       <ul className="list-inline p-0 m-0 music-play-lists">
                                          <li className="share">
                                             <span><i className="ri-share-fill"></i></span>
                                             <div className="share-box">
                                                <div className="d-flex align-items-center">
                                                   <Link to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-facebook-fill"></i></Link>
                                                   <Link to="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-twitter-fill"></i></Link>
                                                   <Link to="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" className="share-ico iq-copy-link" tabIndex="0"><i className="ri-links-fill"></i></Link>
                                                </div>
                                             </div>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </SwiperSlide>
                              <SwiperSlide as="li">
                                 <div className="block-images position-relative">
                                    <div className="img-box">
                                       <img src={suggested2} className="img-fluid" alt=""/>
                                    </div>
                                    <div className="block-description">
                                       <h6 className="iq-title"><Link to="/pricing-plan">Biosolids Pro 180 Part 2</Link></h6>
                                       <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                                          <span className="text-white">4h 30m</span>
                                       </div>
                                       <div className="hover-buttons">
                                          <Link to="/pricing-plan" role="button" className="btn btn-hover iq-button">
                                             <i className="fa fa-rocket mr-2" aria-hidden="true"></i>Subscribe Now
                                          </Link>
                                       </div>
                                    </div>
                                    <div className="block-social-info">
                                       <ul className="list-inline p-0 m-0 music-play-lists">
                                          <li className="share">
                                             <span><i className="ri-share-fill"></i></span>
                                             <div className="share-box">
                                                <div className="d-flex align-items-center">
                                                   <Link to="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-facebook-fill"></i></Link>
                                                   <Link to="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" className="share-ico" tabIndex="0"><i className="ri-twitter-fill"></i></Link>
                                                   <Link to="#" data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/" className="share-ico iq-copy-link" tabIndex="0"><i className="ri-links-fill"></i></Link>
                                                </div>
                                             </div>
                                          </li>
                                          <li>
                                             <span><i className="ri-heart-fill"></i></span>
                                             <span className="count-box">19+</span>
                                          </li>
                                          <li>
                                             <span><i className="ri-add-line"></i></span>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </SwiperSlide>
                           </Swiper>
                        </div>
                     </Col>
                  </Row>
               </Container>
            </section>
         </div>
      </>
   )
}


export default Homepage