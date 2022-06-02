# GradHelp

### Machine learning application made using _React.js_, _FastAPI_ and _MongoDB_. Uses _SVC_ to predict user's chance of admission in top US universities. Also a _Keras_ neural network is used to recommend universities based on user profile.

### Docker Images

[Client Docker Image](https://hub.docker.com/r/sharmasanskar/gradhelp_client) || [Server Docker Image](https://hub.docker.com/r/sharmasanskar/gradhelp_server)

### MODULE 1: Homepage

Homepage of the application from where users can access other modules. Application is styled using **TailwindCSS**.

![Homepage](https://user-images.githubusercontent.com/66771507/167882397-8b6f32a2-d700-4d3e-a8dc-6862d5c45e4a.png)

### MODULE 2: User Profile

Users can create their profile which will be used by the ML models. The profile data is also stored in **localstorage** to persist between sessions.

![User Profile](https://user-images.githubusercontent.com/66771507/167882551-fc157783-36cb-44c7-af75-7ee49b8312de.png)

### MODULE 3: Admission Chance Prediction

Users can explore the top 300 US universities, which is retrieved from **MongoDB**. User's chance of admission is predicted using a **Support Vector Classifier** model.

![Top US universities](https://user-images.githubusercontent.com/66771507/167882646-ab8ef847-758d-4b0f-9433-2fe7f97e92f3.png)
![Admission Chance Prediciton](https://user-images.githubusercontent.com/66771507/167882759-0fe35fea-c9fd-4e39-a9b9-1b525cf166ff.png)

### MODULE 4: University Recommendations

Three universities are recommended to the users based on their profile. A **Keras** neural network is used to generate recommendations.

![University Recommendations](https://user-images.githubusercontent.com/66771507/167882888-b5d2d07c-445f-48ac-af05-62e8fbfc85c9.png)
