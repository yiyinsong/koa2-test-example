//����gulp
const gulp = require('gulp'); 
//�Զ����ز�� ʡȥһ��һ��require����
const gulpLoadPlugins = require('gulp-load-plugins'); 
//�����ͬ��
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
        script: 'public/app.min.js', // ���Բ��ֶԳ���������Ӱ����ļ��ĸĶ���nodemonֻ����js�ļ�������ext������չ����ļ����� 
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

    //gulp.watch('src/sass/**/*.scss' , ['styles']); //���仯 ִ��styles����
    gulp.watch('src/**/*.js' , ['scripts']);
});
gulp.task('default', ['server']);  
