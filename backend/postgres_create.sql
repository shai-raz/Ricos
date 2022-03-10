set transaction read write; 

CREATE TABLE Users (
	uid SERIAL PRIMARY KEY,
	username VARCHAR(55) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	mail VARCHAR(255) UNIQUE NOT NULL,
	firstName VARCHAR(55) NOT NULL,
	lastName VARCHAR(55),
	profilePic TEXT,
	bio TEXT,
	numOfRecipes INT DEFAULT 0,
	numOfFollowers INT DEFAULT 0,
	numOfFollowing INT DEFAULT 0
);

CREATE TABLE Recipe (
	rid SERIAL PRIMARY KEY,
	uid INT NOT NULL,
	date TIMESTAMP NOT NULL,
	title VARCHAR(255) NOT NULL,
	description TEXT,
	img TEXT,
	ingredients TEXT,
	steps TEXT,
	numOfLikes INT DEFAULT 0,
	FOREIGN KEY (uid) REFERENCES Users(uid)
);

CREATE TABLE Comment (
	cid SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	numOfLikes INT DEFAULT 0
);

CREATE TABLE RecipeLikes(
	uid INT NOT NULL,
	rid INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES Users(uid),
	FOREIGN KEY (rid) REFERENCES Recipe(rid),
	PRIMARY KEY(uid, rid)
);

CREATE TABLE CommentLikes (
	uid INT NOT NULL,
	cid INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES Users(uid),
	FOREIGN KEY (cid) REFERENCES Comment(cid),
	PRIMARY KEY (uid, cid)
);

CREATE TABLE CommentsOnRecipes (
	uid INT NOT NULL,
	cid INT NOT NULL,
	rid INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES Users(uid),
	FOREIGN KEY (cid) REFERENCES Comment(cid),
	FOREIGN KEY (rid) REFERENCES Recipe(rid),
	PRIMARY KEY (uid, cid, rid)
);

CREATE TABLE Follows (
	uid INT NOT NULL,
	followerId INT NOT NULL,
	FOREIGN KEY (uid) REFERENCES Users(uid),
	FOREIGN KEY (followerId) REFERENCES Users(uid),
	PRIMARY KEY (uid, followerId),
	date TIMESTAMP NOT NULL
);