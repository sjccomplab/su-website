// Gulp
var gulp = require('gulp');

//Gulp plugins
var pug = require('gulp-pug');
var changed = require('gulp-changed');
var less = require('gulp-less');
var eslint = require("gulp-eslint");
var imagemin = require("gulp-imagemin");

//plugins of plugins
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ["last 2 versions", "> 5%", "not ie < 8"] });

//just a test
gulp.task('default', function(done){
  console.log("OK");
  done();
});

//pug to html conversion
gulp.task('pug', function(){
  return gulp.src("app/templates/views/*.pug")
  .pipe(changed("docs/")) //pipe files only if changed 
  .pipe(pug({pretty:true})) //pug to html
  .pipe(gulp.dest('docs/'));
});


//less to css conversion
gulp.task('styling', function(){
  return gulp.src("app/styles/site.less")
  .pipe(changed("docs/styles")) //pipe files only if changed 
  .pipe(less({
    plugins: [autoprefix]
  })) //less to css
  .pipe(gulp.dest('docs/styles'));
});




//optimise js
gulp.task('js',function(){
  return gulp.src("app/js/**/*.js")
  //.pipe(changed("docs/js"))//pipe files only if changed 
  .pipe(eslint({
    configFile: '.eslintrc'
  }))//eslint: check if js has any errors
  // .pipe(babel({
  //   presets: ['@babel/env']
  // })) //babel: change js to traditional js syntax
  .pipe(gulp.dest("docs/js"));  
});

//minify image
gulp.task('imagemin',function(){
  return gulp.src("app/images/**/*")
  .pipe(changed("docs/images"))//pipe files only if changed 
  .pipe(imagemin())
  .pipe(gulp.dest("docs/images"));
});

gulp.task('imagecopy',function(){
  return gulp.src("app/images/**/*")
  .pipe(changed("docs/images"))//pipe files only if changed 
  .pipe(gulp.dest("docs/images"));
});


gulp.task('fontcopy',function(){
  return gulp.src("app/fonts/*")
  .pipe(changed("docs/images"))//pipe files only if changed 
  .pipe(gulp.dest("docs/fonts"));
});



gulp.task('build',gulp.series('js','pug','styling','imagecopy','fontcopy'));
