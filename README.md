

### Orizon - Quiz feature ###
This quiz feature is imported from the Orizon [project](https://github.com/livprojects/orizon). While Orizon is a team project, I was the only one working on the quiz feature; this is why it appears separately on my Github profile. 

A full demonstration of the Orizon project is available [here](https://www.youtube.com/watch?v=yRnSeJcDcPs&feature=youtu.be&t=5041) (in French). 

This quiz feature was originally developed in a React/Redux environment. While it made sense in the whole project, I though using Redux for just one quiz would have been too heavy. This is why in this version, I replaced all the containers/reducers/middlewares process (calling the database) by one file containing all the data needed for the quiz to work. 

You can still see how it worked, for instance how it is supposed to save a score in the database: I left the code commented on purpose.  

---

__Tech stack__
- HTML/CSS
- React
