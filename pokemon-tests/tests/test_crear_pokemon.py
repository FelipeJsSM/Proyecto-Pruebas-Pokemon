from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

def test_crear_pokemon():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("http://localhost:5001/create-pokemon")
    driver.maximize_window()

    driver.find_element(By.NAME, "Name").send_keys("Pikachu Test")

    driver.find_element(By.NAME, "imageUrl").send_keys(
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
    )

    region = driver.find_element(By.NAME, "regionId")
    region.find_element(By.XPATH, "./option[2]").click()

    tipo = driver.find_element(By.NAME, "tipoId")
    tipo.find_element(By.XPATH, "./option[2]").click()

    driver.find_element(By.XPATH, "//button[@type='submit']").click()

    time.sleep(2)

    elementos = driver.find_elements(By.XPATH, "//*[contains(text(), 'Pikachu Test')]")
    assert len(elementos) > 0

    driver.save_screenshot("tests/screenshots/crear_pokemon.png")

    driver.quit()
