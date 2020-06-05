# NPM or Yarn?

We use yarn for everything. Do that por favor.

# Styling

After creating a component, add a new style sheet in the src/scss folder. If you have installed all deps using yarn, use the script "scss" in the terminal to watch all scss files. Works like a charm. There are also other styling techniques used by previous teams (material ui, useStyles, etc.), but labs 24 onward we have been using scss, making new scss files if needed. 

# Images

We store all images in the public folder. If you think you need to add images to this front end app, feel free to create a folder to put them inside. To access them and add them to a JSX image tag simply use process.env.PUBLIC_URL like so:
<img src={process.env.PUBLIC_URL + '/images/yourFolder/yourImage.png'}> etc

Feel free to add notes for future teams here...



