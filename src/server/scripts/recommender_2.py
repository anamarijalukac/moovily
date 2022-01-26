import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from nltk.stem.snowball import SnowballStemmer
import warnings
import sys

warnings.simplefilter('ignore')

metadata = pd.read_csv("./data/metadata.csv")
metadata = metadata.drop(['Unnamed: 0'], axis=1)
metadata.genres = metadata.genres.fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])
metadata['year'] = pd.to_datetime(metadata['release_date'], errors='coerce').apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)

links_small = pd.read_csv('./data/links_small.csv')
links_small = links_small[links_small.tmdbId.notnull()].tmdbId
links_small = links_small.astype('int64')

avail = metadata[metadata.id.isin(links_small)]
avail.tagline = avail.tagline.fillna('')
avail.overview = avail.overview.fillna('')
avail['description'] = avail.tagline + " " + avail.overview

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(avail.description)
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

#NOVO ISPOD
credits = pd.read_csv('./data/credits.csv')
keywords = pd.read_csv('./data/keywords.csv')

metadata = metadata.merge(credits, on='id').merge(keywords, on='id')
metadata = metadata.drop(['Unnamed: 0'], axis=1)
metadata.head()

avail = metadata[metadata.id.isin(links_small)]

avail['cast'] = avail['cast'].apply(literal_eval)
avail['keywords'] = avail['keywords'].apply(literal_eval)
avail['crew'] = avail['crew'].apply(literal_eval)
avail['cast_size'] = avail['cast'].apply(lambda x: len(x))
avail['crew_size'] = avail['crew'].apply(lambda x: len(x))


def get_director(crew):
    for member in crew:
        if member['job'] == 'Director':
            return member['name']
    return np.nan


avail['director'] = avail['crew'].apply(get_director)
# avail['cast'] = avail['cast'].apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])
avail['cast'] = avail['cast'].apply(lambda x: x[:3] if len(x) > 3 else x)
avail['keywords'] = avail['keywords'].apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])

avail.cast = avail.cast.apply(lambda x: [w.replace(" ", "").lower() for w in x])
avail.director = avail.director.astype('str').apply(lambda x: x.replace(" ", "").lower())
avail.director = avail.director.apply(lambda x: [x, x, x])

key = avail.apply(lambda x: pd.Series(x.keywords), axis=1).stack().reset_index(level=1, drop=True)
key.name = 'keyword'
key = key.value_counts()
key = key[key > 5]

stemmer = SnowballStemmer('english')
stemmer.stem('films')

def filter_keywords(keywords):
    words = []
    for i in keywords:
        if i in key:
            words.append(i)
    return words

avail.keywords = avail.keywords.apply(filter_keywords)
avail.keywords = avail.keywords.apply(lambda x: [stemmer.stem(i) for i in x])
avail.keywords = avail.keywords.apply(lambda x: [str.lower(i.replace(" ", "")) for i in x])

avail['stack'] = avail.keywords + avail.cast + avail.genres + avail.director
avail['stack'] = avail['stack'].apply(lambda x: ' '.join(x))

count = CountVectorizer(analyzer='word',ngram_range=(1, 5),min_df=0)
count_matrix = count.fit_transform(avail['stack'])

cosine_sim = linear_kernel(count_matrix, count_matrix)

titles = avail.title
indices = pd.Series([i for i in range(len(avail))], index=avail.title)

def get_recommendations(title, number):
    try:
        idx = indices[title]
    except:
        #TODO
        #napraviti da svaki film mora postojati u datasetu... ali kako???
        print("Film (%s) does not exist in the dataset" % title)
        return

    if type(idx) != np.dtype('int64') and len(idx) > 1:
        #returns most popular movie with that name!!!
        idx = sorted(idx, key=lambda x: avail.iloc[x].popularity, reverse=True)
        idx = idx[0]

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:number + 1]
    movie_indices = [i[0] for i in sim_scores]
    return titles.iloc[movie_indices]

def main():
    movie_name = sys.argv[1]

    reccomendations = get_recommendations(movie_name, 10)
    print(reccomendations)

if __name__ == "__main__":
    main()
