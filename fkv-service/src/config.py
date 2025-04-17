from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DBHOST: str
    DBPORT: int
    DBUSER: str
    DBPASS: str
    DBNAME: str

    @property
    def DB_URL(self):
        return f"postgresql+asyncpg://{self.DBUSER}:{self.DBPASS}@{self.DBHOST}:{self.DBPORT}/{self.DBNAME}"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()