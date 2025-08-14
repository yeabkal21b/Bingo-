from django.contrib import admin
from .models import Agent, Transaction, GameSpeed, WinningPattern, GameRound, User

class TransactionInline(admin.TabularInline):
    model = Transaction
    readonly_fields = ('timestamp', 'transaction_type', 'amount', 'balance_after_transaction', 'notes')
    extra = 0
    can_delete = False

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ['user', 'operational_credit']
    inlines = [TransactionInline]

    def save_model(self, request, obj, form, change):
        if change:  # Editing, not adding
            old_obj = Agent.objects.get(pk=obj.pk)
            old_credit = old_obj.operational_credit
            new_credit = form.cleaned_data['operational_credit']
            if new_credit != old_credit:
                Transaction.objects.create(
                    agent=obj,
                    transaction_type=Transaction.ADMIN_CREDIT,
                    amount=new_credit - old_credit,
                    balance_after_transaction=new_credit,
                    notes=f"Manual adjustment by admin ({request.user.username})"
                )
        super().save_model(request, obj, form, change)

admin.site.register(Transaction)
admin.site.register(GameSpeed)
admin.site.register(WinningPattern)
admin.site.register(GameRound)
admin.site.register(User)