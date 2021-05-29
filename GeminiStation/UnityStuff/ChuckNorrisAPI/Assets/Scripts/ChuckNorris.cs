using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class ChuckNorris : MonoBehaviour
{
    public TextMeshProUGUI jokeText;

    public void NewJoke()
    {
        Joke j = APIHelper.GetNewJoke();
        jokeText.text = j.value;
    }
}
