export const facebook = new RegExp(
  /^(http(s)?:\/\/)?((w{3}\.)?)facebook.com\/.+?$/
);
export const twitter = new RegExp(
  /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
);
export const linkedin = new RegExp(
  /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/
);
export const website = new RegExp(
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
);
