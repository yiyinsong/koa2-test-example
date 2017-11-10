//引入gulp
const gulp = require('gulp');
//自动加载插件 省去一个一个require进来
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('backendSass', ()=>{
    return gulp.src('src/backend/sass/*.scss')
        .pipe($.sass())
        .pipe($.cssnano())
//        .pipe($.rename({suffix: '.min'}))
        .pipe($.concat('index.min.css'))
        .pipe(gulp.dest('public/backend/css'));
});
gulp.task('frontendSass', ()=>{
    return gulp.src('src/frontend/sass/*.scss')
        .pipe($.sass())
        .pipe($.cssnano())
//        .pipe($.rename({suffix: '.min'}))
        .pipe($.concat('index.min.css'))
        .pipe(gulp.dest('public/frontend/css'));
});

gulp.task('scripts' , ()=>{
    return gulp.src('src/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.uglify())
        .pipe(gulp.dest('public'));     
});

gulp.task('server', function() { 
    $.nodemon({ 
        script: 'public/app.js',
        ignore: [
			"public/**/*.*", 
			"views/**/*.*", 
			"gulpfile.babel.js", 
			"node_modules/",
		], 
        env: { 'NODE_ENV': 'development' } 
    }).on('start', function() {
        browserSync.init({ 
            proxy: 'http://syy.jdhui.com:3000',
            files: ["public/**/*.*", "views/**"],
            port: 8080
		}, function() {
			console.log("browser refreshed."); 
		}); 
    }); 

    gulp.watch('src/**/*.js' , ['scripts']);
    gulp.watch('src/backend/sass/*.scss', ['backendSass']);    
	gulp.watch('src/frontend/sass/*.scss', ['frontendSass']);
});
gulp.task('default', ['server']);  
