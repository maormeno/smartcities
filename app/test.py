import random


def mock_test():
    random_number = random.randint(0, 1)
    assert random_number == 1
    print("Test passed")


if __name__ == "__main__":
    mock_test()
