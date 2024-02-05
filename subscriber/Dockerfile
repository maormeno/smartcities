FROM python:3.9.0-slim
ENV PYTHONUNBUFFERED 1
WORKDIR /subscriber
COPY requirements.txt /subscriber/
RUN pip install -r requirements.txt
COPY . /subscriber/
CMD [ "nohup","python", "subscriber.py"]
