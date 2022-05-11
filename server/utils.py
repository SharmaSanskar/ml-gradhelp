from pickle import load
import numpy as np
from keras.models import load_model


# ASSETS
ADMISSION_MODEL = load(open("./ML/models/graduate_admissions_classifier.pickle", "rb"))
RECOMMENDATION_MODEL = load_model("./ML/models/uni_recommender_150")
SCALER = load(open("./ML/models/std_scaler.pickle", "rb"))
ENCODER = load(open("./ML/models/label_encoder.pickle", "rb"))

# UTILS
def get_uni_rating(uniRank):
    if uniRank <= 20:
        return 1
    elif uniRank <= 50:
        return 2
    elif uniRank <= 100:
        return 3
    elif uniRank <= 200:
        return 4
    else:
        return 5


def predict_admission(gre, toefl, rating, sop, lor, cgpa, research):
    return int(
        ADMISSION_MODEL.predict([[gre, toefl, rating, sop, lor, cgpa, research]])[0]
    )


def top_recommendations(n, pred):
    recommendations = []
    for _ in range(n):
        pred_class = np.argmax(pred, axis=-1)
        recommendations.append(pred_class)
        pred[pred_class] = -1
    return ENCODER.inverse_transform(recommendations)


def recommend_universities(research, industry, toefl, greV, greQ, greA, cgpa):
    transformed_data = SCALER.transform(
        [[research, industry, toefl, greV, greQ, greA, cgpa]]
    )
    pred = RECOMMENDATION_MODEL.predict(transformed_data)[0]
    n = 3  # number of recommendations
    recommendations = top_recommendations(n, pred)
    return list(recommendations)
