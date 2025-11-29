from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

def test_eliminar_pokemon():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("http://localhost:5001/pokemons")
    driver.maximize_window()

    time.sleep(1)

    primer_nombre = driver.find_element(By.XPATH, "(//h5)[1]").text.replace("Nombre: ", "")

    boton_eliminar = driver.find_element(By.CLASS_NAME, "delete-pokemon")
    boton_eliminar.click()

    time.sleep(2)

    elementos = driver.find_elements(By.XPATH, f"//*[contains(text(), '{primer_nombre}')]")
    assert len(elementos) == 0

    driver.save_screenshot("tests/screenshots/eliminar_pokemon.png")

    driver.quit()
