import pickle

print("Loading movies.pkl...")

with open("data/movies.pkl", "rb") as f:
    movies = pickle.load(f)

print("Movies loaded successfully!")
print("Type:", type(movies))
print("Shape:", movies.shape)
print("Columns:", list(movies.columns))

print("\nLoading similarity.pkl...")

with open("data/similarity.pkl", "rb") as f:
    similarity = pickle.load(f)

print("Similarity loaded successfully!")
print("Type:", type(similarity))
print("Shape:", similarity.shape)

print("\nModel verification")
print("------------------")

if len(movies) == similarity.shape[0]:
    print("✅ Movie count matches similarity matrix")
else:
    print("❌ Movie count DOES NOT match similarity matrix")