from datetime import timedelta
import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)

# === KULLANICI AYARLARI ===
CHANNEL_ID = 123456789012345678  # Kanal ID'ni yaz (tırnaksız sadece sayı)
TOKEN = "MTUzNjcwMDU2OTE3ODA3OTI2Mg.GB11qj.dubX1_xqDw0M-OfVCHw_KItUjvb1sy15zzzv_g"  # Token'ını tırnak içine yaz
# ==========================


@bot.event
async def on_ready():
    print(f"🚀 Bot aktif: {bot.user}")


@bot.event
async def on_member_join(member):
    channel = bot.get_channel(CHANNEL_ID)
    if channel:
        poll = discord.Poll(
            question=f"Aramıza hoş geldin {member.name}! Stok güncellemelerinden haberdar olmak ister misin?",
            duration=timedelta(hours=24),
        )
        poll.add_answer(text="Evet, 'Stok Bildirimi' rolünü ver! 🔔")
        poll.add_answer(text="Hayır, istemiyorum ❌")

        await channel.send(content=member.mention, poll=poll)


@bot.event
async def on_raw_poll_vote_add(payload):
    if payload.answer_id == 1:
        guild = bot.get_guild(payload.guild_id)
        role = discord.utils.get(guild.roles, name="Stok Bildirimi")
        member = guild.get_member(payload.user_id)

        if role and member and not member.bot:
            await member.add_roles(role)
            try:
                await member.send(
                    "✅ **Stok Bildirimi** rolü başarıyla hesabına eklendi!"
                )
            except:
                pass


bot.run(TOKEN)

