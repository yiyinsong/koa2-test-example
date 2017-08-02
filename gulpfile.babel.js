//引入gulp
const gulp = require('gulp'); 
//自动加载插件 省去一个一个require进来
const gulpLoadPlugins = require('gulp-load-plugins'); 
//浏览器同步
const browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('scripts' , ()=>{
    return gulp.src('src/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.uglify())
        .pipe($.rename({suffix: '.min'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('public'));     
});

gulp.task('server', ['scripts'], function() { 
    $.nodemon({ 
        script: 'public/app.min.js', // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型 
        ignore: ["gulpfile.js", "node_modules/", "package.json"], 
        env: { 'NODE_ENV': 'development' } 
    }).on('start', function() { 
        browserSync.init({ 
            proxy: 'http://localhost:3000', 
            files: ["app.min.js", "public/**/*.*", "views/**"], 
            port:8080 
    }, function() { 
        console.log("browser refreshed."); 
        }); 
    }); 

    //gulp.watch('src/sass/**/*.scss' , ['styles']); //监测变化 执行styles任务
    gulp.watch('src/**/*.js' , ['scripts']);
});
gulp.task('default', ['server']);  
