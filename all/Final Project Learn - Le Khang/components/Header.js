class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /* html */`
    <header class="echo-header-area header-three">
    <!-- Start Home-1 Menu & Site Logo & Social Media -->
    <div class="echo-home-1-menu header-three">
        <div class="echo-site-main-logo-menu-social">
            <div class="container header-container">
                <div class="echo-site-main">
                    <div class="row align-items-center">
                        <div class="col-xl-2 col-lg-2 col-md-8 col-sm-8 col-6">
                            <div class="echo-site-logo">
                                <a href="index.html"><img src="assets/images/home-1/site-logo/site-logo-w.svg" alt="Echo"></a>
                            </div>
                        </div>
                        <div class="col-xl-7 col-lg-7 d-none d-lg-block">
                            <nav>
                                <div class="echo-home-1-menu">
                                    <ul class="list-unstyled echo-desktop-menu" id="mainMenu">
                                        <li class="menu-item echo-has-dropdown">
                                            <a href="#" class="echo-dropdown-main-element">Post</a>
                                            <ul class="echo-submenu list-unstyled menu-pages">
                                                <li class="nav-item"><a href="post-style-1.html">Post Style 1</a></li>
                                                <li class="nav-item"><a href="post-style-2.html">Post Style 2</a></li>
                                                <li class="nav-item"><a href="post-style-3.html">Post Style 3</a></li>
                                                <li class="nav-item"><a href="post-details.html">Post Details</a></li>
                                            </ul>
                                        </li>
                                        <li class="menu-item"><a href="contact.html" class="echo-dropdown-main-element">Contact</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
                            <div class="echo-home-1-social-media-icons">
                                <ul class="list-unstyled">
                                    <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
                                </ul>
                                <div class="rts-darkmode">
                                    <a id="rts-data-toggle" class="rts-dark-light">
                                        <i class="rts-go-dark fal fa-moon"></i>
                                        <i class="rts-go-light far fa-sun"></i>
                                    </a>
                                </div>
                                <div class="echo-header-top-menu-bar echo-off-canvas menu-btn">
                                    <a href="javascript:void(0)">
                                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.526001 0.953461H20V3.11724H0.526001V0.953461ZM7.01733 8.52668H20V10.6905H7.01733V8.52668ZM0.526001 16.0999H20V18.2637H0.526001V16.0999Z" fill="#5E5E5E" />
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
    <!-- End Home-1 Menu & Site Logo & Social Media -->
</header>`
  }
}

customElements.define('x-header', Header);
