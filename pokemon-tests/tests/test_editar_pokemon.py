from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

def test_editar_pokemon():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("http://localhost:5001/pokemons")
    driver.maximize_window()

    boton_editar = driver.find_element(By.XPATH, "//a[contains(text(), 'Editar')]")
    boton_editar.click()

    time.sleep(1)

    campo_nombre = driver.find_element(By.NAME, "Name")
    campo_nombre.clear()
    campo_nombre.send_keys("Pikachu Editado")

    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    time.sleep(2)

    elementos = driver.find_elements(By.XPATH, "//*[contains(text(), 'Pikachu Editado')]")
    assert len(elementos) > 0

    driver.save_screenshot("tests/screenshots/editar_pokemon.png")

    driver.quit()
