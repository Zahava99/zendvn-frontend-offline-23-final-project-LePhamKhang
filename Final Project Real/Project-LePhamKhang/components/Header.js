class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /* html */`
    <header class="echo-header-area">
      <div class="echo-header-top">
        <div class="container">
          <div class="echo-full-header-top">
            <div class="row align-items-center plr_md--30">
              <div class="col-xl-4 col-lg-4 d-none d-lg-block">
                <div class="echo-meta-total-jobs">
                  <div class="echo-meta-jobs-icons">
                    <img
                      src="assets/images/home-1/header-top/home-1-header-top.png"
                      alt="Echo"
                    />
                  </div>
                  <div class="echo-meta-jobs-text">
                    <div class="swiper rt-treding-slider10">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide">
                          <span>Meta to cut 10,000 jobs in second...</span>
                        </div>
                        <div class="swiper-slide">
                          <span>Elevating Your Office Attire...</span>
                        </div>
                        <div class="swiper-slide">
                          <span>Beauty and Wellness Secrets...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-8">
                <div class="echo-header-top-date">
                  <div class="echo-day-name">
                    <span><i class="fa-regular fa-calendar"></i></span>
                    <span id="echo-day" class="echo-home-day"></span>
                    <span id="echo-date"></span>
                  </div>
                  <div class="echo-date-time">
                    <span><i class="fa-regular fa-cloud"></i></span>
                    <span><strong id="temperature">31°C,</strong> TP.Hồ Chí Minh </span>
                  </div>
                </div>
              </div>
              <div
                class="col-xl-4 col-lg-4 col-md-6 col-sm-5 col-4 position-relative"
              >
                <div class="echo-header-top-subs-social-menu">
                  <div class="echo-header-top-subs-social">
                    <div class="echo-header-top-subscribe-btn">
                      <a
                        href="#"
                        class="echo-py-btn"
                        onclick="document.getElementById('id01').style.display='inline'"
                        ><i class="fa-regular fa-envelope"></i> Subscribe</a
                      >
                    </div>
                    <div class="echo-header-top-social-media">
                      <div class="rts-darkmode">
                        <a id="rts-data-toggle" class="rts-dark-light">
                          <i class="rts-go-dark fal fa-moon"></i>
                          <i class="rts-go-light far fa-sun"></i>
                        </a>
                      </div>
                      <a
                        href="#"
                        id="search"
                        class="echo-header-top-search-btn search-icon action-item icon"
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.11544 16.961C13.3484 16.961 16.7798 13.5296 16.7798 9.29665C16.7798 5.06373 13.3484 1.63226 9.11544 1.63226C4.88251 1.63226 1.45105 5.06373 1.45105 9.29665C1.45105 13.5296 4.88251 16.961 9.11544 16.961Z"
                            stroke="#5E5E5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.4461 15.0254L17.451 18.0225"
                            stroke="#5E5E5E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                      <div class="search-input-area">
                        <div class="container">
                          <div class="search-input-inner">
                            <div class="input-div">
                              <input
                                id="searchInput1"
                                class="search-input"
                                type="text"
                                placeholder="Search by keyword or #"
                              />
                            </div>
                            <div class="search-close-icon">
                              <i class="fa-regular fa-xmark-large rt-xmark"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="echo-header-top-menu-bar menu-btn">
                      <a href="javascript:void(0)">
                        <svg
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.526001 0.953461H20V3.11724H0.526001V0.953461ZM7.01733 8.52668H20V10.6905H7.01733V8.52668ZM0.526001 16.0999H20V18.2637H0.526001V16.0999Z"
                            fill="#5E5E5E"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Start Home-1 Menu & Site Logo & Social Media -->
      <div class="echo-home-1-menu">
        <div class="echo-site-main-logo-menu-social">
          <div class="container">
            <div class="row align-items-center plr_md--30 plr_sm--30 plr--10">
              <div class="col-xl-2 col-lg-2 col-md-7 col-sm-7 col-7">
                <div class="echo-site-logo">
                  <a class="logo-light" href="index.html"
                    ><img
                      src="assets/images/home-1/site-logo/site-logo.svg"
                      alt="Echo"
                  /></a>
                  <a class="logo-dark" href="index.html"
                    ><img
                      src="assets/images/home-1/site-logo/site-logo-dark.svg"
                      alt="Echo"
                  /></a>
                </div>
              </div>
              <div class="col-xl-7 col-lg-7 d-none d-lg-block">
                <nav>
                  <div class="echo-home-1-menu">
                    <ul class="list-unstyled echo-desktop-menu" id="mainMenu">
                      <li class="menu-item echo-has-dropdown">
                        <a href="#" class="echo-dropdown-main-element active"
                          >Home</a
                        >
                        <!-- Start Dropdown Menu -->
                        <ul class="echo-submenu list-unstyled menu-home">
                          <li class="nav-item">
                            <a href="index.html">Home 01 - Main</a>
                          </li>
                          <li class="nav-item">
                            <a href="index-two.html">Home 02 - Fashion</a>
                          </li>
                          <li class="nav-item">
                            <a href="index-three.html">Home 03 - Technology</a>
                          </li>
                          <li class="nav-item">
                            <a class="mobile-menu-link" href="index-four.html"
                              >Home 04 - Gamming</a
                            >
                          </li>
                          <li class="nav-item">
                            <a class="mobile-menu-link" href="index-five.html"
                              >Home 05 - Sports</a
                            >
                          </li>
                          <li class="nav-item">
                            <a class="mobile-menu-link" href="index-six.html"
                              >Home 06 - Travel</a
                            >
                          </li>
                          <li class="nav-item">
                            <a class="mobile-menu-link" href="index-seven.html"
                              >Home 07 - AI</a
                            >
                          </li>
                          <li class="nav-item">
                            <a class="mobile-menu-link" href="index-eight.html"
                              >Home 08 - Politics</a
                            >
                          </li>
                          <li class="nav-item">
                            <a class="mobile-menu-link" href="index-nine.html"
                              >Home 09 - Food</a
                            >
                          </li>
                          <li class="nav-item">
                            <a class="mobile-menu-link" href="index-ten.html"
                              >Home 10 - Photography</a
                            >
                          </li>
                        </ul>
                        <!-- End Dropdown Menu -->
                      </li>
                      <li class="menu-item echo-has-dropdown">
                        <a href="#" class="echo-dropdown-main-element">Pages</a>
                        <ul class="echo-submenu list-unstyled menu-pages">
                          <li class="nav-item">
                            <a href="about.html">About</a>
                          </li>
                          <li class="nav-item">
                            <a href="author.html">Author</a>
                          </li>
                          <li class="nav-item"><a href="team.html">Team</a></li>
                          <li class="nav-item">
                            <a href="404.html">Error Page</a>
                          </li>
                        </ul>
                      </li>
                      <li class="menu-item echo-has-dropdown">
                        <a href="#" class="echo-dropdown-main-element"
                          >Category</a
                        >
                        <ul class="echo-submenu list-unstyled menu-pages">
                          <li class="nav-item">
                            <a href="category-style-1.html">Category Style 1</a>
                          </li>
                          <li class="nav-item">
                            <a href="category-style-2.html">Category Style 2</a>
                          </li>
                          <li class="nav-item">
                            <a href="category-style-3.html">Category Style 3</a>
                          </li>
                        </ul>
                      </li>
                      <li class="menu-item echo-has-dropdown">
                        <a href="#" class="echo-dropdown-main-element">News</a>
                        <ul class="mega-menu list-unstyled menu-pages">
                          <li class="nav-item">
                            <a href="post-style-1.html">
                              <div class="mega-menu-item">
                                <div
                                  class="mega-menu-img img-transition-scales"
                                >
                                  <img
                                    src="assets/images/home-1/latest-news/item-1.png"
                                    alt="Echo"
                                    class="img-hovers"
                                  />
                                </div>
                                <div class="mega-menu-title">
                                  <h5>Xi, Putin hail 'new era'....</h5>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a href="post-style-2.html">
                              <div class="mega-menu-item">
                                <div
                                  class="mega-menu-img img-transition-scales"
                                >
                                  <img
                                    src="assets/images/home-1/latest-news/item-2.png"
                                    alt="Echo"
                                    class="img-hovers"
                                  />
                                </div>
                                <div class="mega-menu-title">
                                  <h5>Elon Musk's global empire....</h5>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a href="post-style-3.html">
                              <div class="mega-menu item">
                                <div
                                  class="mega-menu-img img-transition-scales"
                                >
                                  <img
                                    src="assets/images/home-1/latest-news/item-3.png"
                                    alt="Echo"
                                    class="img-hovers"
                                  />
                                </div>
                                <div class="mega-menu-title">
                                  <h5>Sri Lanka to receive first ....</h5>
                                </div>
                              </div>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a href="post-details.html">
                              <div class="mega-menu item">
                                <div
                                  class="mega-menu-img img-transition-scales"
                                >
                                  <img
                                    src="assets/images/home-1/latest-news/item-4.png"
                                    alt="Echo"
                                    class="img-hovers"
                                  />
                                </div>
                                <div class="mega-menu-title">
                                  <h5>Turkey earthquake prepare....</h5>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li class="menu-item echo-has-dropdown">
                        <a href="#" class="echo-dropdown-main-element">Post</a>
                        <ul class="echo-submenu list-unstyled menu-pages">
                          <li class="nav-item">
                            <a href="post-style-1.html">Post Style 1</a>
                          </li>
                          <li class="nav-item">
                            <a href="post-style-2.html">Post Style 2</a>
                          </li>
                          <li class="nav-item">
                            <a href="post-style-3.html">Post Style 3</a>
                          </li>
                          <li class="nav-item">
                            <a href="post-details.html">Post Details</a>
                          </li>
                        </ul>
                      </li>
                      <li class="menu-item">
                        <a
                          href="contact.html"
                          class="echo-dropdown-main-element"
                          >Contact</a
                        >
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-5 col-sm-5 col-5">
                <div class="echo-home-1-social-media-icons">
                  <ul class="list-unstyled social-area">
                    <li>
                      <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa-brands fa-pinterest-p"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa-brands fa-youtube"></i></a>
                    </li>
                  </ul>
                  <div class="echo-header-top-menu-bar menu-btn">
                    <a href="javascript:void(0)">
                      <svg
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.526001 0.953461H20V3.11724H0.526001V0.953461ZM7.01733 8.52668H20V10.6905H7.01733V8.52668ZM0.526001 16.0999H20V18.2637H0.526001V16.0999Z"
                          fill="#5E5E5E"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Home-1 Menu & Site Logo & Social Media -->
    </header>`
  }
}

customElements.define('x-header', Header);
