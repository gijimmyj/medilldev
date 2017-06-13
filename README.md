# Template

Here is a brief step by step process of setting up the project for compiling.

1. Install [NPM](https://www.npmjs.com/)

2. After installing NPM make sure that it is in your path so you can use it in the command line. It usually works out of the bag in MAC/Linux, but sometimes the path needs to be added [manually in Windows](http://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8/32159233).

3. Extract the project files and cd to the directory in your command line.

4. Run `npm install` to install all the dependencies for the project. This can take several minutes.

5. Once you have the dependencies installed, to build the project and "watch" any changes in sass, js, or html partials you will run `gulp` in the command line.

A browser window will open of the project and you will be able to see it edited live. Whenever you make a change to the html, sass, or js, the browser automatically refreshes.

With the project running, the command line will chirp at you if there are any issues with how your code is compiled. It's very helpful!

If you want to add new svg icons you just drop them into src/svgstore. They will be automatically compiled and turned into a spritesheet. You can see how icons are used in some of the html partials. They can also be used directly in the sass.

The map.js needs to be manually copied over to your dist folder after your first build.