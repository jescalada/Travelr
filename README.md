## Travelr

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Resources](#resources)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## General Info
Travelr is an app that allows users to form groups and chat together so they can find a place to stay in big cities.
	
## Website
[Travelr](https://travelr-bcit.netlify.app)
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript, jQuery
* Bootstrap
* Firebase and Firestore 
* Netlify

## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when they visit the root path (travelr-bcit.netlify.app/)
└── README.md                # woah, you're reading this now!

It has the following subfolders and files:
├── .git                     # Folder for git repo

├── html                     # Folder for html files
        /chat.html           # chat HTML file, what users see when they click on Chats
        /group-info.html     # group info HTML file, what users see when they access a group
        /groups.html         # group list HTML file, what users see when they click on Groups (view all the groups)
        /login.html          # login HTML file, the log-in page
        /main.html           # main HTML file, the page users see after logging in
        /profile.html        # profile HTML file, what users see when they click on Me in the footer menu
        /search.html         # search HTML file, the search results page 

├── images                   # Folder for images
        /icons
            /travelr-logo.svg
        /login.jpg
            /https://unsplash.com
        
├── scripts                         # Folder for scripts
        /authentication.js          # Firebase authentication backend
        /chat.js                    # JS for chat.html
        /firebaseAPI_DTC15.js       # firebase API stuff, shared across pages
        /group-info.js              # JS for group-info.html
        /groups.js                  # JS for groups.html
        /load-user.js               # loads user into frontend, shared across pages
        /main.js                    # JS for main.html
        /profile.js                 # JS for profile.html
        /realTime_API_DTC15.js      # firebase Realtime DB API, used only in chat.html
        /search.js                  # JS for search.html
        /skeleton.js                # loads navbar and footer, shared across pages

├── styles                          # Folder for styles
        /chat.css                   # style for chat.html
        /group-info.css             # style for group-info.html
        /main.css                   # style for main.html
        /profile.css                # style for profile.html
        /search.css                 # style for search.html
        /style.css                  # generic stylesheet for all pages

├── text                            # Folder for text containers
        /footer.html                # code snippet for generating the footer
        /nav.html                   # code snippet for generating the navbar
        
```


## Resources
- Icons by [Iconify Design](https://icon-sets.iconify.design/zmdi/) (Open Source)
- Code snippets from [Bootdey](https://www.bootdey.com/) (Free to use)
- Logo made by Juan 
- Login image from [unsplash](https://unsplash.com/)(Free to use)

## Contact 
* [Atsuki Uchida - auchida1@my.bcit.ca](mailto:auchida1@my.bcit.ca)
* [Juan Escalada - jescalada@my.bcit.ca](mailto:jescalada@my.bcit.ca)
* [Stefan Chen - zchen158@my.bcit.ca](mailto:zchen158@my.bcit.ca)

## Acknowledgements 
* <a href="https://ajax.googleapis.com/">jQuery</a>
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>
* <a href="https://www.bootdey.com/">Bootdey (Bootstrap snippets)</a>
