// 添加引用
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var gulp = require('gulp');
var less = require('gulp-less')

//这个可以让express启动
gulp.task("node", function() {
    nodemon({
        script: './bin/www',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});
// 编译less
// 在命令行输入 gulp less 启动此任务
gulp.task('less', function () {
    // 1. 找到 less 文件
    gulp.src('public/less/**/**.less')
    // 2. 编译为css
        .pipe(less())
        // 3. 另存文件
        .pipe(gulp.dest('public/stylesheets/css'))
});
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('public/less/**.less', ['less'])
})
gulp.task('server', ["node","less","auto"], function() {
    var files = [
        "routes/**",
        'views/**/*.html',
        'views/**/*.ejs',
        'views/**/*.jade',
        'views/**/*.pug',
        'public/**/*.*'
    ];

    browserSync.init(files, {
        proxy: 'http://192.168.49.1:3000',
        browser: 'chrome',
        notify: false,
        port: 3001
    });

    gulp.watch(files).on("change", reload);
});