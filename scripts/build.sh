DISTPATH="./dist"
SRCPATH="./src/*"
CSSpATH="./dist/assets/css"
rm -rf ${DISTPATH}
mkdir ${DISTPATH}
cp -r ${SRCPATH} ${DISTPATH}
mkdir ${CSSpATH}
node-sass ${DISTPATH}/assets/scss/main.scss ${CSSpATH}/styles.css
rm -rf ${DISTPATH}/assets/scss
rm -rf ${DISTPATH}/assets/components/*/*.scss
