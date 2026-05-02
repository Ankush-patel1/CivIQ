# Use Python 3.12
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8080

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything
COPY . .

# Expose port
EXPOSE 8080

# Start the application using uvicorn
# We run from the root so that backend.main:app works
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
