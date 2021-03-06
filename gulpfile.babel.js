//引入gulp
const gulp = require('gulp');
//自动加载插件 省去一个一个require进来
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('sass', ()=>{
    return gulp.src('src/sass/**/*.scss')
        .pipe($.sass())
        .pipe($.cssnano())
//        .pipe($.rename({suffix: '.min'}))
        .pipe($.concat('index.min.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('scripts' , ()=>{
    return gulp.src('src/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.uglify())
      //.pipe($.rename({suffix: '.min'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('public'));     
});

gulp.task('server', function() { 
    $.nodemon({ 
        script: 'public/app.js',
        ignore: ["gulpfile.babel.js", "node_modules/", "package.json"], 
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
    gulp.watch('src/sass/**/*.scss', ['sass']);
});
gulp.task('default', ['server']);  
