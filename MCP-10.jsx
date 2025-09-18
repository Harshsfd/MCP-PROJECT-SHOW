import click
import asyncio
from mcp import Server

@click.group()
def cli():
    pass

@click.command()
def start_server():
    server = Server()
    asyncio.run(server.start())
    click.echo("MCP server started!")

@click.command()
def stop_server():
    click.echo("Stopping server...")

cli.add_command(start_server)
cli.add_command(stop_server)

if __name__ == "__main__":
    cli()