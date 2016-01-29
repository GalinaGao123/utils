# CFA
  CFA Brand Site

### Dependence
  * nodejs
  * npm

### Prepare
  Run `npm  install` first

### Usage
  - `npm run build`

    build project for develop

  - `npm run dev`

    open a server for develop and watching source files

  - `npm run dist`

    build the project for production, it will uglify the JS and
    minify the CSS

### Preview Pages
you can visit **localhost:3000/all** --> will return a index about all pages

### Project Structure
  - **build** *files without compress for develop*
    - **\*.html** *pages files*
    - **static** *static resources*
  - **dist** *file for production*
  - **src** *source files*
    - **libs** *extern files*
    - **common** *common files*
    - **pages** *files for each page*
    - **resources** *some images icons fonts*
