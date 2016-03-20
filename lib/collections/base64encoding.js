if (Meteor.isServer) {
    var fs = Npm.require("fs");
}
Base64encoding = function(){};

// function to encode file data to base64 encoded string
Base64encoding.prototype.base64_encode = function (file) {
    // read binary data
    try {
        var bitmap = fs.readFileSync(file);
    } catch (e) {
        console.log(e);
        return null;
    }
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
};

// function to create file from base64 encoded string
Base64encoding.prototype.base64_decode = function (base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    // write buffer to file
    //try {
    //    fs.writeFileSync(file, bitmap);
    //} catch (e) {
    //    console.log(e);
    //}
    return new Buffer(base64str, 'base64');
};
