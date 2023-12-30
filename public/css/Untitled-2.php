<?php /* Template Name: online-order */ ?>

<?php
get_header();

get_template_part('partials/single-article');
?>

<div class="container">

    <div class="row">


        <div class="col-xs-12 col-sm-12 col-md-9">

            <div class="sect single">
                <h3 class="news-title">توضیحات فرم سفارش آنلاین</h3>

                <p>
                    تشکر از اینکه گروه ما را برای طراحی و خرید خود انتخاب نموده اید خواهشمندیم جهت آگاهی از تعرفه خدمات
                    ساخت و خرید و ارسال پیش فاکتور اولیه و یا ثبت نهایی سفارش اطلاعا فرم زیر را با دقت پر نمایید. سفارش
                    جهت انجام پروسه ساخت فرم ذیل را به دقت پر نموده و توضیحات لازم را در قسمت مربوطه ذکر نمائید، بعد از
                    ارسال موفقیت آمیز فرم ، کارشناسان ما طی مدت کوتاهی پاسخ شما را به صورت آنلاین یا تلفنی خواهند داد و
                    پیش فاکتور اولیه برای شما عزیزان ایمیل خواهد شد و در صورت تائید از سمت شما سفارش جهت طراحی اولیه و
                    مراحل بعدی ساخت ارسال می گردد. در پایان خواهشمندیم نظرات و پیشنهادات خود را برای ما ارسال نمائید.
                </p>
                <p>
                    سفارش آنلاین در سایت ما بسیار آسان می باشد. طراحان سایت تمامی سعی خود را مبنی بر آسان بودن کار با
                    سایت انجام داده اند. سفارش دادن در چند مرحله زیر خلاصه می شود:

                </p>
                <ul>
                    <li>سفارش آنلاین</li>
                    <li>تضمین کیفیت</li>
                    <li>ظرفیت بالای تولید</li>
                    <li>ماشینهای پیشترفته</li>
                    <li>قیمت گذاری مناسب</li>
                    <li>تحویل سریع</li>
                    <li>خدمات ۲۴ ساعته</li>
                </ul>
                <h5>جهت سفارش آنلاین فرم زیر را با دقت پر کنید</h5>
                <form id="contactForm">
                    <div class="form-group row g-mb-25">
                        <div class="col-md-5 mt-3 mplnone">
                            <label for="contactName">نام و نام خانوادگی</label>
                            <input class="form-control" required type="text" name="contactName" id="contactName"
                                value="" placeholder="نام و نام خانوادگی">
                        </div>
                        <div class="col-md-7 mt-3">
                            <label for="email">ایمیل</label>
                            <input type="text" name="email" id="email" value="" class="form-control" placeholder="ایمیل"
                                required>
                        </div>

                        <div class="col-md-7 mt-3">
                            <label for="tel">تلفن ثابت</label>
                            <input class="form-control" type="tel" name="tel" id="tel" value="" placeholder="تلفن ثابت">
                        </div>
                        <div class="col-md-5 mt-3 mplnone">
                            <label for="mobiletel">تلفن همراه</label>
                            <input required class="form-control rounded-0 form-control-md" type="tel" name="mobiletel"
                                id="mobiletel" placeholder="تلفن همراه">
                        </div>
                        <div class="col-md-5 mt-3 mplnone">
                            <label for="products">محصول درخواستی</label>

                            <select class="form-control" id="products">
                                <option value="پمپ وکیوم آبی">پمپ وکیوم آبی</option>
                                <option value="پمپ وکیوم روغنی">پمپ وکیوم روغنی</option>
                                <option value="پمپ وکیوم خشک">پمپ وکیوم خشک</option>
                                <option value="پمپ وکیوم">پمپ وکیوم</option>
                            </select>
                        </div>

                        <div class="col-md-7 mt-3">
                            <label for="firmName">نام شرکت یا موسسه</label>
                            <input class="form-control" type="text" name="firmName" id="firmName" value=""
                                placeholder="نام شرکت یا موسسه">
                        </div>

                        <div class="col-md-7 mt-3">
                            <label for="typeofapplication">نوع درخواست</label>

                            <select class="form-control" id="typeofapplication">
                                <option value="call">تماس تلفنی کارشناسان</option>
                                <option value="send">ارسال پیش فاکتور</option>
                                <option value="coast">مشاوره تلفنی و اعلام قیمت</option>
                                <option value="another">موارد دیگر</option>
                            </select>
                        </div>

                        <div class="col-md-5 mt-3 mplnone">
                            <label for="familiar">از کجا با این وبسایت آشنا شدید</label>

                            <select class="form-control" id="familiar">
                                <option value="google">جستجو در گوگل</option>
                                <option value="Friend">معرفی دوستان</option>
                                <option value="telegram">کانال تلگرام وب سایت</option>
                                <option value="instagram">صفحه اینستاگرام وبسایت</option>
                                <option value="linkedin">صفحه لینکدین وبسایت</option>
                                <option value="aparat">صفحه آپارات</option>
                                <option value="another">موارد دیگر</option>
                            </select>
                        </div>


                        <div class="col-md-12 mt-3">
                            <div class="form-group">
                                <label for="commentsText">توضیحات مربوطه</label>

                                <textarea required rows="4" name="commentsText" id="commentsText" class="form-control"
                                    placeholder="توضیحات" cols="30"></textarea>
                            </div>
                            <button id="submitted" name="submitted" type="submit"
                                class="btn btn-block mt-3 g-py-15 u-btn-primary rounded-0">
                                اطلاعات بالا را تایید و ارسال میکنم
                            </button>
                            <p id="status" class="form-row"></p>
                        </div>
                    </div>
                </form>
                </div>





            <div class="col-md-3 col-xs-12 col-sm-12">
                <div class="sidebar">
                    <div class="products">
                        <h3>محصولات</h3>
                        <div class="item">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>hydraulic/">
                                <img src="<?php echo get_template_directory_uri().'/images/products/hydraulic.jpg' ?>"
                                    title="هیدرولیک" alt="هیدرولیک">
                                <h4>هیدرولیک</h4>
                            </a>
                        </div>
                        <div class="item">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>actuator/">
                                <img src="<?php echo get_template_directory_uri().'/images/products/i.jpg' ?>"
                                    title="اکچویتور" alt="اکچویتور">
                                <h4>اکچویتور</h4>
                            </a>
                        </div>
                        <div class="item">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>pneumatic/">
                                <img src="<?php echo get_template_directory_uri().'/images/products/e.jpg' ?>"
                                    title="پنوماتیک" alt="پنوماتیک">
                                <h4>پنوماتیک</h4>
                            </a>
                        </div>
                        <div class="item">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>instrumentation/">
                                <img src="<?php echo get_template_directory_uri().'/images/instrumentation.jpg' ?>"
                                    title="ابزار دقیق" alt="ابزار دقیق">
                                <h4>ابزار دقیق</h4>
                            </a>
                        </div>





                    </div>

                    <div class="instagram">
                        <a href="https://www.instagram.com/hydro_norma/">
                            <img src="<?php echo get_template_directory_uri().'/images/instagram.png' ?>"
                                title="instagram" alt="instagram">
                        </a>
                    </div>
                    <div class="telegram">
                        <a href="https://t.me/hidro_norma">
                            <img src="<?php echo get_template_directory_uri().'/images/telegram.jpg' ?>"
                                title="telegram" alt="telegram">
                        </a>
                    </div>

                    <div class="lastNews">
                        <h3>جدید ترین نوشته ها</h3>
                        <ul>
                            <?php $args = array( 'category_name' => 'article','posts_per_page' => 6);
		$query = new WP_Query( $args );
		if($query->have_posts()) :?>
                            <?php while($query->have_posts()) : $query->the_post();?>
                            <li><a href="<?php the_permalink();?>"><?php the_title();?></a> </li>
                            <?php endwhile; ?>
                            <?php endif; ?>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

    </div>



    <?php get_footer();?>