using UnityEngine;
using System.Net; // Because we're dealing with HTTP requests
using System.IO; // Read the response using Stream Reader

public static class APIHelper {
    public static Joke GetNewJoke() {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://api.chucknorris.io/jokes/random");
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        StreamReader reader = new StringReader(response.GetResponseStream());
        string json = reader.ReadToEnd(); // Get all text value from the reader as a string
        return JsonUtility.FromJson<Joke>(json);
    }
}
