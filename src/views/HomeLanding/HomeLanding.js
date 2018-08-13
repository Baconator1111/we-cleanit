import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeLanding() {
    return (
        <div>
            <div>
                <Link to='/services-selection' ><button>Get a Free Online Quote!</button></Link>
            </div>
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header page-scroll">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand page-scroll" href="#page-top"><img className="img-responsive logo-squires" src="img/Header.png"></img></a>
                    <a className="navbar-brand page-scroll" href="#page-top"><img className="img-responsive horseOnly" src="img/horseOnly.png"></img></a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="hidden">
                            <a href="#page-top"></a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#about">About</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#carpet">Carpet Cleaning</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#janitorial">Janitorial</a>
                        </li>
                        <li>
                            <a className="page-scroll" href="#serviceArea">Service Area</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    <header>
        <div className="container">
            <div className="intro-text">
                <div className="zeroContainer">
                    <h3 className="squiresBanner">Squires Cleaning Service</h3>
                </div>
                <div className="intro-lead-in">Request an Estimate</div>
                <div className="intro-heading">509-301-9024</div>
                <a href="#serviceArea" className="page-scroll btn btn-xl">Service Area</a>
            </div>
        </div>
    </header>

    <section id="about">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">About</h2>
                    <h3 className="section-subheading text-muted">The best janitorial and carpet service in town.</h3>
                    <h3 className="section-subheading text-muted subHeader">Licensed, Bonded, and Insured. 30 years of
                        quality experience serving the Walla Walla Valley</h3>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-home fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Locally Owned</h4>
                    <p className="text-muted">My family and I have lived in the Walla Walla Valley for 50 years. The
                        Johnson family is known for their hard work and us here at Squire's Cleaning embrace the family
                        values. We find pride in providing our friends and neighbors with quality service.</p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-user fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Customer Focused</h4>
                    <p className="text-muted">We know that you, the customer is what keeps us in business. In a town
                        this size your reputation is the most important marketing you have. We are focused on making
                        sure you are fully satisfied with the service we provide. We hope to not only clean your carpets
                        but leave you with a smile on your face.</p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-gear fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="service-heading">Professional Quality</h4>
                    <p className="text-muted">We here at Squire's Carpet Steamer use the state of the art cleaning
                        equipment and chemicals. Through learning and experience we will bring the best out of your
                        carpets and make your home a place bare feet love.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="carpet">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Squires Carpet Steamer</h2>
                    <h3 className="section-subheading text-muted">We are a full service company.</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <ul className="timeline">
                        <li>
                            <div className="timeline-image">
                                <img className="img-circle img-responsive" src="img/carpet2.jpg" alt=""></img>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>Carpet Cleaning</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="list-align-justified">
                                        <li className="list-item">Deep Cleaning</li>
                                        <li className="list-item">Pet stains and odor removal</li>
                                        <li className="list-item">Stain guard</li>
                                        <li className="list-item">Furniture moving</li>
                                        <li className="list-item">Green cleaning</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image">
                                <img className="img-circle img-responsive" src="img/upholstery.jpg" alt=""></img>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>Upholstery Cleaning</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="list-align-justified">
                                        <li className="list-item">Deep Cleaning</li>
                                        <li className="list-item">Pet stains and odor removal</li>
                                        <li className="list-item">Green cleaning</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="timeline-image">
                                <img className="img-circle img-responsive" src="img/tile1.jpg" alt=""></img>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>Tile and Grout</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="list-align-justified">
                                        <li className="list-item">Truck-mounted steam/pressure cleaning</li>
                                        <li className="list-item">Stripping and Waxing VCT tile</li>
                                        <li className="list-item">We use tile and grout specific cleaners that strip
                                            away any waxy build-up and remove the dirt embedded in the grout lines.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section id="janitorial" className="bg-light-gray">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Janitorial</h2>
                    <h3 className="section-subheading text-muted">We are a full service company.</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <ul className="timeline">
                        <li>
                            <div className="timeline-image">
                                <img className="img-circle img-responsive" src="img/generalCleaning1.jpg" alt=""></img>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>All General Cleaning</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="list-align-justified">
                                        <li className="list-item">Residential</li>
                                        <li className="list-item">Commercial</li>
                                        <li className="list-item">Trash removal</li>
                                        <li className="list-item">Vacuuming</li>
                                        <li className="list-item">Dusting</li>
                                        <li className="list-item">Window Cleaning</li>
                                        <li className="list-item">Bathroom Cleaning</li>
                                        <li className="list-item">Bathroom restoration</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image">
                                <img className="img-circle img-responsive" src="img/glass1.jpg" alt=""></img>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>Glass Cleaning</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="list-align-justified">
                                        <li className="list-item">Streak Free</li>
                                        <li className="list-item">Interior/Exterior</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="timeline-image">
                                <img className="img-circle img-responsive" src="img/tile2.jpg" alt=""></img>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>Stripping and Waxing</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="list-align-justified">
                                        <li className="list-item">VCT tile</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image">
                                <img className="img-circle img-responsive" src="img/construction2.jpg" alt=""></img>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>Construction Clean Up</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="list-align-justified">
                                        <li className="list-item">We have completed projects from 1000 - 100,000 sq
                                            feet
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image">
                                <h4>Let Us Take Care Of You</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section id="serviceArea" className="bg-light-gray">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">Service Area</h2>
                    <h3 className="section-subheading text-muted">We serve the Walla Walla Valley.</h3>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <img src="img/serviceArea.png" className="img-responsive img-centered"></img>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <span className="copyright">Copyright &copy; squirescleaningservice.com 2017</span>
                </div>
                <div className="col-md-4">
                    <ul className="list-inline social-buttons">
                        <li><a href="#"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li><a href="https://www.facebook.com/Squires-Cleaning-Service-847322528691621"><i
                            className="fa fa-facebook"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <ul className="list-inline quicklinks">
                        <li><a href="#">Privacy Policy</a>
                        </li>
                        <li><a href="#">Terms of Use</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
        </div>

    )
}