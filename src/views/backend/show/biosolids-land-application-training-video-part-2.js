import React, {  useMemo }  from 'react'
// import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useAuth } from './../../../components/auth/useAuth';
import {Redirect} from 'react-router-dom'
// import ReactPlayer from 'react-player';
import LoadingContent from './../../../components/LoadingContent';
import 'bootstrap/dist/css/bootstrap.css';


const s3HTML = `{
   <!DOCTYPE html>
   <html lang="en">
      <head>
         <meta charset="UTF-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>S3Bubble GitHub Pages Demo</title>
         <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
         <link rel="stylesheet" href="https://unpkg.com/@s3bubble/player@latest/dist/css/s3bubble.min.css" />
         <style>
            body {
                  font-family: 'Roboto', sans-serif;
            }
            .wrapper {
                  margin: auto;
            }
         </style>
         <script type="text/javascript">
            window.s3bubbleGlobals = {
               autoplay: true
            }
         </script>
      </head>
      <body>
         <div class="wrapper">
            <h1>S3Bubble DRM Video</h1>
            <div id="player"></div>
         </div>
         <script src="https://unpkg.com/@s3bubble/player@latest/dist/js/s3bubble.min.js"></script>
      <script>
         s3bubble('player').drm({
            type: "video",
            drm:{
                  widevine: {
                     code: 'ra6ew1',
                     keysystem: 'com.widevine.alpha',
                     license: 'https://widevine-dash.ezdrm.com/widevine-php/widevine-foreignkey.php?pX=EDA71C'
                  },
                  playready: {
                     code: 'ra6ew1',
                     keysystem: 'com.microsoft.playready',
                     license: 'https://playready.ezdrm.com/cency/preauth.aspx?pX=0B3749'
                  },
            }
         }); 
      </script>
      </body>
   </html>
}`

const ShowList = () => { 
   const { 
      user,
      hasPlan
  } = useAuth();

//   useEffect(() => {
//    const link = document.createElement("link");
//    link.href = "https://unpkg.com/@s3bubble/player@latest/dist/css/s3bubble.min.css";
//    link.type = "text/css";
//    link.rel = "stylesheet";
//    link.media = "screen,print";
//    document.body.appendChild(link);

//    const script = document.createElement("script");
//    script.src = "https://unpkg.com/@s3bubble/player@latest/dist/js/s3bubble.min.js";
//    script.async = true;
//    document.body.appendChild(script);

//    window.s3bubble('s3bdrm').drm({
//       type: 'video',
//       drm: {
//          widevine: {
//             code: '19F258BA-5B90-47F9-A604-D9AD0DEDA71C',
//             keysystem: 'com.widevine.alpha',
//             license: 'https://widevine-dash.ezdrm.com/widevine-php/widevine-foreignkey.php?pX=EDA71C'
//          },
//          playready: {
//             code: '243467BE-7064-45D1-B098-DAE41B0B3749',
//             keysystem: 'com.microsoft.playready',
//             license: 'https://playready.ezdrm.com/cency/preauth.aspx?pX=0B3749'
//          },
//       }
//    });
  
//   }, [])

//   const playerRef = useRef(null)

   // useEffect(() =>{
   //    if (subscription && products) checkCurrentPlan(products, subscription)
   // }, [subscription, products, checkCurrentPlan])

   // useEffect(() => {
   //    if(playerRef) {
   //       window.s3bubble(playerRef).drm({
   //          drm: {
   //             widevine: {
   //                code: '19F258BA-5B90-47F9-A604-D9AD0DEDA71C',
   //                keysystem: 'com.widevine.alpha',
   //                license: 'http://wvm.ezdrm.com/PlayValue.asp'
   //             },
   //             playready: {
   //                code: '243467BE-7064-45D1-B098-DAE41B0B3749',
   //                keysystem: 'com.microsoft.playready',
   //                license: 'http://previous.ezdrm.com/demo/SilverLightDRM-OOB-Out-of-Browser/postbackurl.asp'
   //             },
   //          }
   //    }, function(player){
            
   //          player.on('timeupdate', function(event){
   //             console.log('event',player.currentTime());
   //          });

   //    });
   // }
   // }, [playerRef])
   const Content = useMemo(() => {
      if(!user) {
         // Avoid using 
         return <Redirect to='/extra-pages/login' />
      }

      const mainContent = <>
      <div className="video-container iq-main-slider">
         {/* <div id="s3bdrm"></div> */}
         <iframe title='Biosolids Land Application Training Video Part 1' srcDoc={s3HTML}/>
         {/* <ReactPlayer 
            controls
            muted
            playing
            className="video d-block" 
            width="100%"
            height="100%"
            url="https://dwfhzrlrmrdy3.cloudfront.net/day01-ii-(1)/master.mpd" />       */}
      </div>
      <div className="main-content">
         <section className="movie-detail container-fluid">
            <Row>
               <Col lg="12">
                  <div className="trending-info season-info g-border">
                     <h4 className="trending-text big-title text-uppercase mt-0">Biosolids Land Application Training Video</h4>
                     <div className="d-flex align-items-center text-white text-detail episode-name mb-0">
                        <span>Part II</span>
                        <span className="trending-year">TOPICS</span>
                     </div>
                     <ul className="info-share trending-dec w-100 mb-0">
                        <li>Preliminary Planning, Phase I Site Screening, Phase II Site Evaluation</li>
                        <li>Biosolids Transport</li>
                        <li>Land Area Requirements</li>
                        <li>Agricultural Land Application</li>
                        <li>Domestic Septage</li>
                        <li>Current Biosolids Issues</li>
                     </ul>
                     {/* <ul className="list-inline p-0 mt-4 share-icons music-play-lists">
                        <li>
                           <span><i className="ri-add-line"></i></span>
                        </li>
                        <li>
                           <span><i className="ri-heart-fill"></i></span>
                        </li>
                        <li className="share">
                           <span><i className="ri-share-fill"></i></span>
                           <div className="share-box">
                              <div className="d-flex align-items-center">
                                 <Link to="#" className="share-ico"><i className="ri-facebook-fill"></i></Link>
                                 <Link to="#" className="share-ico"><i className="ri-twitter-fill"></i></Link>
                                 <Link to="#" className="share-ico"><i className="ri-links-fill"></i></Link>
                              </div>
                           </div>
                        </li>
                     </ul> */}
                  </div>
               </Col>
            </Row>
         </section>
         {/* <section id="iq-favorites">
            <Container fluid>
               <div className="block-space">
                  <Row>
                     <Col sm="12" className="overflow-hidden">
                        <div className="iq-main-header d-flex align-items-center justify-content-between">
                           <h4 className="main-title">Latest Episodes</h4>
                           <Link to="#" className="text-primary">View all</Link>
                        </div>
                     </Col>
                  </Row>
                  <Row>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode1} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode2} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode3} className="img-fluid img-zoom" alt=""/>  
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode4} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode5} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode6} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode7} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode8} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode9} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                     <Col md="6" className="col-1-5 iq-mb-30">
                        <div className="epi-box">
                           <div className="epi-img position-relative">
                              <img src={episode10} className="img-fluid img-zoom" alt=""/>
                              <div className="episode-play-info">
                                 <div className="episode-play">
                                    <Link to="#">
                                       <i className="ri-play-fill"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="epi-desc p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                 <span className="text-white">11 Aug 20</span>
                                 <span className="text-primary">30m</span>
                              </div>
                              <Link to="#">
                                 <h6 className="epi-name text-white mb-0">Lorem Ipsum is simply dummy text</h6>
                              </Link>
                           </div>
                        </div>
                     </Col>
                  </Row>
               </div>
            </Container>
         </section> */}
      </div>
   </>
      
      if (hasPlan) {
         return <>
            {mainContent}
         </>
      } else {
         return <LoadingContent />
      }
   }, [user, hasPlan])

   return (
      <>
      {Content}
      </>
   )
}
export default ShowList; 