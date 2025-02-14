<template>
  <footer class="app-footer">
    <div class="container">
      <div class="header-divider d-flex">
        <span></span>
      </div>
      <div class="footer-inner-container d-flex">
        <article class="footer-info">
          <h2>Company</h2>
          <ul>
            <li>
              <a href="#">
                Our Services
              </a>
            </li>
            <li>
              <a href="#">
                Latest News
              </a>
            </li>
            <li>
              <a href="#">
                Meet The Directors
              </a>
            </li>
            <li>
              <a href="#">
                Latest Movies
              </a>
            </li>
            <li>
              <a href="#">
                Album & Gallery
              </a>
            </li>
            <li>
              <a href="#">
                Global Brands
              </a>
            </li>
          </ul>
        </article>
        <article class="footer-info">
          <h2>Account</h2>
          <ul>
            <li>
              <a href="#">
                My account
              </a>
            </li>
            <li>
              <a href="#">
                Checkout
              </a>
            </li>
            <li>
              <a href="#">
                Cart
              </a>
            </li>
            <li>
              <a href="#">
                Sample page
              </a>
            </li>
          </ul>
        </article>
        <div class="footer-info">

          <address class="footer-address">
            <div class="footer-number">
              <a href="tel: +013 (456) 7899">
                +013 (456) 7899
              </a>
            </div>
            <div class="footer-email">
              <a href="mailto:support@gmail.com">
                support@gmail.com
              </a>
            </div>
          </address>
          <div>
            <p>
              Monday — Friday <time datetime="7:00">7:00am </time> — <time datetime="17:00">5:00pm</time> <br>
              Saturday <time datetime="8:00"> 8:00am </time> — <time datetime="17:00"> 5:00pm </time> <br>
              Closed Sunday
            </p>
            <p>
              205 New South East Road
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="copyright">
      <p>© 2021 ENVALAB. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.app-footer {
  color: var(--white);
  padding: 40px 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .header-divider {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    span {
      width: 100%;
      height: 2px;
      background-color: var(--main-color);
      display: block;
    }
  }

  .footer-inner-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .footer-info {
      flex: 1 1 200px;
      margin-right: 20px;
      margin-bottom: 20px;

      h2 {
        font-size: 20px;
        margin-bottom: 15px;
        color: var(--main-color);
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 5px;

          a {
            color: var(--white);
            text-decoration: none;
            font-size: 15px;
            transition: color 0.3s ease;

            &:hover {
              color: var(--main-color);
            }
          }
        }
      }
    }

    .footer-address {
      margin-bottom: 20px;

      .footer-number,
      .footer-email {
        margin-bottom: 10px;

        a {
          color: var(--white);
          text-decoration: none;
          font-size: 15px;
          transition: color 0.3s ease;

          &:hover {
            color: var(--main-color);
          }
        }
      }
    }

    p {
      font-size: 15px;
      color: #bbb;
      line-height: 1.6;
    }
  }

  .copyright {
    text-align: center;
    margin-top: 40px;
    font-size: 15px;
    color: #bbb;

    span a {
      color: var(--main-color);
      text-decoration: none;

      &:hover {
        color: var(--second-color);
      }
    }
  }
}
</style>